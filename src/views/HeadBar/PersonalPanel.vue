<template>
  <div>
    <div class="personal-panel">
      <div class="personal-desc">
        <div class="name-role">
          <span>{{ user.name }}</span>
        </div>
        <div class="name-role">
          <span>{{ user.role }}</span>
        </div>
        <div class="name-role">
          <span>{{ user.registeInfo }}</span>
        </div>
      </div>
      <div class="personal-footer" @click="changePassword">
        <li class="fa fa-key">修改密码</li>
      </div>
      <div class="personal-footer" @click="logout">
        <li class="fa fa-sign-out"></li>
        退出登录
      </div>
    </div>
    <DialogChangePassword
      v-if="dialogChangePasswordVisible"
      :dialogChangePasswordVisible="dialogChangePasswordVisible"
      @clearUserInfo="clearUserInfo"
      @closeDialogChangePassword="closeDialogChangePassword"
    ></DialogChangePassword>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import api from "@/components/Asset/Api";
import DialogChangePassword from "../Dialog/DialogChangePassword";
export default {
  name: "PersonalPanel",
  components: {
    DialogChangePassword: DialogChangePassword,
  },
  props: {
    user: {
      type: Object,
      default: {
        name: "admin",
        role: "超级管理员",
        registeInfo: "注册时间：2018-12-25 ",
      },
    },
  },
  data() {
    return {
      dialogChangePasswordVisible: false,
    };
  },
  methods: {
    changePassword() {
      this.dialogChangePasswordVisible = true;
    },
    // 退出登录
    logout: function () {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          api.layout(null, (response) => {
            let res = response.data;
            console.log("res===", res);
            if (res.code == 0) {
              this.clearUserInfo();
            }
          });
        })
        .catch(() => {});
    },
    // 清空用户信息
    clearUserInfo: function () {
      Cookies.remove("oscar-token");
      sessionStorage.clear();
      window.vue._$common = this._$commonClone;
      this.$router.push("/login");

      console.log("this._$commonClone===", this._$commonClone);
      console.log("window.vue._$common===", window.vue._$common);
      console.log("this._$common===", this._$common);
    },
    closeDialogChangePassword() {
      this.dialogChangePasswordVisible = false;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.personal-panel {
  font-size: 14px;
  width: auto;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
  background: #409eb3;
}
.personal-desc {
  padding: 15px 0px;
  color: #e5e7ec;
}
.name-role {
  font-size: 16px;
  padding: 5px;
}
.personal-footer {
  color: #fff;
  margin-right: 1px;
  font-size: 15px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  /* color: rgb(24, 128, 144); */
  background: rgb(24, 128, 144);
}
</style>