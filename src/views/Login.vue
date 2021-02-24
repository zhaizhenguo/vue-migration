<template>
  <div class="loginClass">
    <el-form
      :model="loginForm"
      :rules="fieldRules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h2 class="title" style="padding-left: 22px">系统登录</h2>
      <el-form-item prop="userName">
        <el-input
          type="text"
          v-model="loginForm.userName"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span="12">
          <el-form-item prop="captcha">
            <el-input
              type="test"
              v-model="loginForm.captcha"
              auto-complete="off"
              placeholder="验证码, 单击图片刷新"
              style="width: 100%"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">&nbsp;</el-col>
        <el-col :span="11">
          <el-form-item>
            <img
              style="width: 100%; height: 36px"
              class="pointer"
              :src="loginForm.src"
              @click="refreshCaptcha"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 48%"
          @click.native.prevent="reset"
          >重 置</el-button
        >
        <el-button
          type="primary"
          style="width: 48%; margin-left: 8px"
          @click.native.prevent="login"
          :loading="loading"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import api from "@/components/Asset/Api";
import { getEncrypt, getDecrypt } from "@/utils/rsaUtil";
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        userName: "admin",
        password: "123456",
        captcha: "",
        src: process.env.API_ROOT + "/captcha.jpg",
      },
      fieldRules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      checked: true,
    };
  },
  methods: {
    getPublicKey() {
      return new Promise((resolve) => {
        api.getPublicKey(null, (response) => {
          let res = response.data;
          if (res.code == 0) {
            try {
              if (!!res.data) {
                this._$common.publicKey = getDecrypt(
                  res.data,
                  this._$common.privateKey
                );
                console.log(
                  "this._$common.publicKey已重置===",
                  this._$common.publicKey
                );
                console.log("this._$commonClone已重置===", this._$commonClone);
              }
            } catch (error) {
              console.error(error);
              this.$message({
                message: "登录异常,请联系管理员",
                type: "error",
              });
            }
          } else {
            this.$message({ message: "登录异常,请联系管理员", type: "error" });
          }
          resolve();
        });
      });
    },
    async login() {
      this.loading = true;
      let userInfo = {
        userName: this.loginForm.userName,
        password: this.loginForm.password,
        captcha: this.loginForm.captcha,
      };

      await this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          /**加密*/
          if (!this._$common.publicKey) {
            this.getPublicKey();
          }
          userInfo.password = getEncrypt(
            this.loginForm.password,
            this._$common.publicKey
          );
          api.login(userInfo, (response) => {
            let res = response.data;
            if (res.code !== 0) {
              this.$message({ message: "登录失败, " + res.msg, type: "error" });
              /**登录超时*/
              if (res.code === -9) {
                this.refreshCaptcha();
                this.reset();
              }
            } else {
              /**放置token到Cookie*/
              Cookies.set("oscar-token", res.data.token);
              /**保存用户到本地会话*/
              sessionStorage.setItem("userRole", res.data.userRole);
              sessionStorage.setItem("userId", res.data.userId);
              sessionStorage.setItem("userName", res.data.userName);
              sessionStorage.setItem("createTime", res.data.createTime);
              /**登录成功跳转到主页 */
              this.$router.push("/DataMigration").catch((err) => {});
            }
          });
        }
      });
      this.loading = false;
    },
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.login();
      }
    },
    refreshCaptcha: function () {
      console.log("process.env.API_ROOT=========", process.env.API_ROOT);
      this.loginForm.src =
        process.env.API_ROOT + "/captcha.jpg?t=" + new Date().getTime();
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },
  },
  async mounted() {
    window.addEventListener("keydown", this.keyDown);
    await this.refreshCaptcha();
    console.log("!!!this._$common.publicKey==", this._$common.publicKey);
    if (!this._$common.publicKey) {
      setTimeout(() => {
        this.getPublicKey();
      }, 500);
    }
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
};
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 200px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
.loginClass {
  height: 100vh;
  overflow: auto;
  background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;
}
</style>
