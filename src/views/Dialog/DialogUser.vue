<template>
  <el-dialog
    :title="operation ? '添加用户' : '修改用户'"
    width="30%"
    :visible="dialogUserVisible"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form
      style="padding: 0px 30px 0px 0px"
      :model="dataForm"
      label-width="120px"
      :rules="dataFormRules"
      ref="dataForm"
      :size="size"
      label-position="right"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="dataForm.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="dataForm.mobile"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="dataForm.email"
          placeholder="test@163.com"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="userRoles">
        <el-select
          v-model="dataForm.userRoles"
          multiple
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工具使用次数" prop="useNumber">
        <el-select
          v-model="dataForm.useNumber"
          filterable
          allow-create
          default-first-option
          placeholder="请选择(可输入自定义次数)"
          style="width: 100%"
        >
          <el-option
            v-for="item in useNumberList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        :size="size"
        type="primary"
        @click.native="submitForm"
        :loading="editLoading"
        >确认</el-button
      >
      <el-button :size="size" @click="close"> 取消 </el-button>
    </div>
  </el-dialog>
</template>
<script>
import api from "@/components/Asset/Api";
import { isEmail, isMobile } from "@/utils/validate";
export default {
  props: {
    dialogUserVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    operation: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    dataForm: {
      type: Object,
      default: function () {
        return {
          name: "",
          password: "",
          email: null,
          mobile: null,
          status: 1,
          userRoles: [],
        };
      },
    },
  },
  data() {
    return {
      size: "small",
      editLoading: false,
      roles: [],
      useNumberList: [
        {
          value: 0,
          label: "禁止使用",
        },
        {
          value: 1,
          label: "1次",
        },
        {
          value: 5,
          label: "5次",
        },
        {
          value: 10,
          label: "10次",
        },
        {
          value: 999,
          label: "无限制",
        },
      ],
      dataFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "change" }],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        email: [
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: "请输正确的邮箱",
          },
        ],
        mobile: [
          {
            pattern: /^1[0-9]{10}$/,
            message: "请输正确的手机号",
          },
        ],
        userRoles: [
          { required: true, message: "请选择用户权限", trigger: "blur" },
        ],
        useNumber: [
          {
            required: true,
            message: "请选择或输入工具使用次数",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]*$/,
            message: "请输入正确的次数",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    // 加载用户角色信息
    findUserRoles: function () {
      this.roles = [
        {
          value: "admin",
          label: "管理员",
        },
        {
          value: "operation",
          label: "运维人员",
        },
        {
          value: "common",
          label: "普通用户",
        },
      ];
    },
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            console.log("params====", params);
            let userRoles = [];
            for (let i = 0, len = params.userRoles.length; i < len; i++) {
              let userRole = {
                userId: params.id,
                roleId: params.userRoles[i],
              };
              userRoles.push(userRole);
            }
            params.userRoles = userRoles;
            api.postUser(params, (response) => {
              this.editLoading = false;
              if (response.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.$emit("findPage", null);
                this.$refs["dataForm"].resetFields();
                this.close();
              } else {
                this.$message({
                  message: "操作失败, " + response.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },
    close() {
      this.$emit("closeDialogUserVisible");
    },
  },
  mounted() {
    this.findUserRoles();
  },
};
</script>