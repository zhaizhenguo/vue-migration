<template>
  <div>
    <el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-input
          :size="size"
          v-model="filters.name"
          placeholder="角色名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <st-button
          icon="fa fa-search"
          type="primary"
          :plain="true"
          :size="size"
          label="查询"
          @click="findPage(null)"
        ></st-button>
      </el-form-item>
      <el-form-item>
        <st-button
          icon="fa fa-plus"
          type="primary"
          :size="size"
          :plain="true"
          label="新增"
          @click="btnAddRole"
        ></st-button>
      </el-form-item>
    </el-form>
    <!--表格内容栏-->
    <st-table
      :size="size"
      :height="'calc(80vh - 250px)'"
      :operationColumnMinWidth="'17%'"
      :data="pageResult"
      :columns="filterColumns"
      :showBatchDelete="false"
      @findPage="findPage"
      @handleEdit="btnEditRole"
      @dblClick="btnEditRole"
      @handleDelete="handleDelete"
    >
    </st-table>
    <dialog-role
      v-if="dialogRoleVisible"
      :dialogRoleVisible="dialogRoleVisible"
      :operation="operation"
      :dataForm="userDataForm"
      @findPage="findPage"
      @closeDialogRoleVisible="closeDialogRoleVisible"
    ></dialog-role>
  </div>
</template>
<script>
import StButton from "@/views/Core/StButton";
import StTable from "@/views/Core/StTable";
import { format } from "@/utils/datetime";
import api from "@/components/Asset/Api";
import DialogRole from "@/views/Dialog/DialogRole";

export default {
  name: "RoleManagement",
  components: {
    StButton: StButton,
    StTable: StTable,
    DialogRole: DialogRole,
  },
  data() {
    return {
      size: "mini",
      filterColumns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},
      filters: {
        name: "",
      },
      operation: true, // true:新增, false:编辑
      dialogRoleVisible: false,
      userDataForm: {},
    };
  },
  methods: {
    findPage(data) {
      if (!!data) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.columnFilters = {
        name: { name: "name", value: this.filters.name },
      };
      api.postRoleFindPage(this.pageRequest, (response) => {
        let res = response.data;
        if (res.code !== 0) {
          this.$message({ message: "查询失败, " + res.msg, type: "error" });
        } else {
          this.pageResult = res.data;
        }
        !!data ? data.callback() : "";
      });
    },
    btnAddRole() {
      this.userDataForm = {};
      this.operation = true;
      this.dialogRoleVisible = true;
    },
    btnEditRole(data) {
      this.userDataForm = JSON.parse(JSON.stringify(data.row));
      this.operation = false;
      this.dialogRoleVisible = true;
    },
    handleDelete(data) {
      api.postRoleDelete(data.params, (response) => {
        let res = response.data;
        data.callback(res);
      });
    },
    // 时间格式化
    dateFormat(row, column, cellValue, index) {
      return format(row[column.property]);
    },
    closeDialogRoleVisible() {
      this.dialogRoleVisible = false;
    },
    // 处理表格列过滤显示
    initColumns() {
      this.columns = [
        { prop: "id", label: "ID", minWidth: "15%" },
        { prop: "name", label: "角色名", minWidth: "15%" },
        { prop: "remark", label: "备注", minWidth: "25%" },
        { prop: "createBy", label: "创建人", minWidth: "15%" },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: "15%",
          formatter: this.dateFormat,
        },
      ];
      this.filterColumns = this.columns;
    },
  },
  mounted() {
    this.initColumns();
  },
};
</script>