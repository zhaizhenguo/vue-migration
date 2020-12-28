<template>
  <el-dialog
    title="修改密码"
    :visible="dialogChangePasswordVisible"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="close"
    width="600px"
  >
    <el-form
      ref="psdData"
      :model="psdData"
      :rules="rules"
      label-width="80px"
      style="padding: 10px 40px"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          type="password"
          placeholder="请输入原密码"
          v-model.trim="psdData.oldPassword"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          placeholder="请输入新密码"
          v-model.trim="psdData.newPassword"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="againPassword">
        <el-input
          type="password"
          placeholder="请再次输入新密码"
          v-model.trim="psdData.againPassword"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin: -30px 40px">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import api from "@/components/Asset/Api";
export default {
  props: {
    dialogChangePasswordVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.psdData.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      multipleSelection: [],
      psdData: {
        oldPassword: "",
        newPassword: "",
        againPassword: "",
      },
      rules: {
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "change",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "change",
          },
        ],
        againPassword: [
          {
            required: true,
            message: "请再次输入新密码",
            trigger: "change",
          },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    submitForm() {
      this.$refs["psdData"].validate((valid) => {
        if (valid) {
          let params = {};
          params.id = sessionStorage.getItem("userId");
          params.oldPassword = this.psdData.oldPassword;
          params.newPassword = this.psdData.newPassword;
          api.user.updatePassword(params, (response) => {
            let res = response.data;
            if (res.code == 0) {
              this.$message({ message: "操作成功", type: "success" });
              //清空用户信息
              this.$emit("clearUserInfo");
            } else {
              this.$message({ message: "操作失败, " + res.msg, type: "error" });
            }
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$emit("closeDialogChangePassword");
    },
  },
  computed: {},
};
</script>
