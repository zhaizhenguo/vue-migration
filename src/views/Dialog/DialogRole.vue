<template>
  <el-dialog
    :title="operation ? '添加角色' : '修改角色'"
    width="750px"
    :visible="dialogRoleVisible"
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
      <el-form-item label="角色名" prop="name">
        <el-input v-model="dataForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="dataForm.remark"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="菜单授权" prop="selectMenuIdList">
        <el-tree
          :data="roleMenuDate"
          :size="size"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          style="width: 100%; height: 135px; overflow: auto"
          ref="menuTree"
          :render-content="renderContent"
          :default-expanded-keys="selectMenuIdList"
          :default-checked-keys="selectMenuIdList"
          :check-strictly="true"
          v-loading="menuLoading"
          element-loading-text="拼命加载中"
          @check-change="handleMenuCheckChange"
        >
        </el-tree>
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
export default {
  props: {
    dialogRoleVisible: {
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
        return {};
      },
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      console.log(
        "validatePass  this.selectMenuIdList===",
        this.selectMenuIdList
      );
      if (!this.selectMenuIdList || this.selectMenuIdList.length == 0) {
        callback(new Error("请选择菜单"));
      } else {
        callback();
      }
    };
    return {
      size: "small",
      editLoading: false,
      menuLoading: false,
      roles: [],
      dataFormRules: {
        name: [{ required: true, message: "请输入角色名", trigger: "change" }],
        selectMenuIdList: [{ validator: validatePass, trigger: "blur" }],
      },

      selectMenuIdList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      roleMenuDate: [],
    };
  },
  methods: {
    findMenus() {
      api.getMenuFindTree(null, (response) => {
        let res = response.data;
        console.log("getMenuFindTreeres", res);
        if (res.code == 0) {
          this.roleMenuDate = res.data;
        } else {
          this.$message({
            message: "加载菜单失败," + response.msg,
            type: "error",
          });
        }
      });
    },
    findRoleMenus() {
      let param = { roleId: this.dataForm.id };
      let resData = [];
      api.getMenuFindMenuByRoleId(param, (response) => {
        let res = response.data;
        if (res.code == 0) {
          for (let index = 0; index < res.data.length; index++) {
            resData.push(res.data[index].id);
          }
        } else {
          this.$message({
            message: "加载菜单失败," + response.msg,
            type: "error",
          });
        }
      });
      setTimeout(() => {
        this.selectMenuIdList = resData;
      }, 100);
    },
    handleMenuCheckChange(data, check, subCheck) {
      if (check) {
        // 节点选中时同步选中父节点
        let index = this.selectMenuIdList.indexOf(data.id);
        if (index === -1) {
          this.selectMenuIdList.push(data.id);
        }
        let parentId = data.parentId;
        this.$refs.menuTree.setChecked(parentId, true, false);
      } else {
        let index11 = this.selectMenuIdList.indexOf(data.id);
        console.log("index11====", index11);
        if (index11 >= 0) {
          this.selectMenuIdList.splice(index11, 1);
        }
        // 节点取消选中时同步取消选中子节点
        if (data.children != null) {
          data.children.forEach((element) => {
            this.$refs.menuTree.setChecked(element.id, false, false);
          });
        }
      }
    },
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            params.roleMenus = this.selectMenuIdList;
            console.log("params====", params);
            /**增加*/
            if (this.operation) {
              api.postRoleSave(params, (response) => {
                let res = response.data;
                if (res.code == 0) {
                  this.$message({ message: "操作成功", type: "success" });
                  this.$emit("findPage", null);
                  this.$refs["dataForm"].resetFields();
                  this.close();
                } else {
                  this.$message({
                    message: "操作失败, " + res.msg,
                    type: "error",
                  });
                }
              });
            } else {
              /**修改*/
              api.postRoleUpdate(params, (response) => {
                let res = response.data;
                if (res.code == 0) {
                  this.$message({ message: "操作成功", type: "success" });
                  this.$emit("findPage", null);
                  this.$refs["dataForm"].resetFields();
                  this.close();
                } else {
                  this.$message({
                    message: "操作失败, " + res.msg,
                    type: "error",
                  });
                }
              });
            }
            this.editLoading = false;
          });
        }
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="column-container">
          <span style="text-algin:center;margin-right:60px;">{data.name}</span>
          <span style="text-algin:center;margin-right:60px;">
            <el-tag
              type={data.type === 0 ? "" : data.type === 1 ? "success" : "info"}
              size="small"
            >
              {data.type === 0 ? "目录" : data.type === 1 ? "菜单" : "按钮"}
            </el-tag>
          </span>
          <span style="text-algin:center;margin-right:60px;">
            {" "}
            <i class={data.icon}></i>
          </span>
          <span style="text-algin:center;margin-right:60px;">
            {data.parentName ? data.parentName : "顶级菜单"}
          </span>
        </div>
      );
    },
    close() {
      this.$emit("closeDialogRoleVisible");
    },
  },
  mounted() {
    if (!this.operation) {
      this.findRoleMenus();
    }
    this.findMenus();
  },
};
</script>