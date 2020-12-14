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
      <el-button type="primary" @click="submit()">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
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
    return {
      multipleSelection: [],
      psdData: {
        oldPassword: "",
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
        ],
      },
    };
  },
  created() {},
  methods: {
    close() {
      this.$emit("closeDialogChangePassword");
    },
  },
  computed: {},
};
</script>
