<template>
  <div>
    <el-form :inline="true" :model="filters" :size="size">
      <el-form-item>
        <el-input
          :size="size"
          v-model="filters.name"
          placeholder="用户名"
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
          @click="btnAddUser"
        ></st-button>
      </el-form-item>
    </el-form>
    <!--表格内容栏-->
    <st-table
      :height="'calc(80vh - 250px)'"
      :operationColumnMinWidth="'17%'"
      :data="pageResult"
      :columns="filterColumns"
      :showBatchDelete="false"
      @findPage="findPage"
      @dblClick="btnEditUser"
      @handleEdit="btnEditUser"
      @handleDelete="handleDelete"
    >
    </st-table>
    <dialog-user
      v-if="dialogUserVisible"
      :dialogUserVisible="dialogUserVisible"
      :operation="operation"
      :dataForm="userDataForm"
      @findPage="findPage"
      @closeDialogUserVisible="closeDialogUserVisible"
    ></dialog-user>
  </div>
</template>
<script>
import StButton from "@/views/Core/StButton";
import StTable from "@/views/Core/StTable";
import { format } from "@/utils/datetime";
import api from "@/components/Asset/Api";
import DialogUser from "@/views/Dialog/DialogUser";

export default {
  name: "userManagement",
  components: {
    StButton: StButton,
    StTable: StTable,
    DialogUser: DialogUser,
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
      dialogUserVisible: false,
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
      api.user.findPage(this.pageRequest, (response) => {
        let res = response.data;
        if (res.code !== 0) {
          this.$message({ message: "查询失败, " + res.msg, type: "error" });
        } else {
          this.pageResult = res.data;
        }
        !!data ? data.callback() : "";
      });
    },

    btnAddUser() {
      this.userDataForm = {};
      this.operation = true;
      this.dialogUserVisible = true;
    },
    btnEditUser(data) {
      this.userDataForm = Object.assign({}, data.row);
      this.operation = false;
      this.dialogUserVisible = true;
    },
    handleDelete(data) {
      api.user.delete(data.params, (response) => {
        let res = response.data;
        data.callback(res);
      });
    },
    // 时间格式化
    dateFormat(row, column, cellValue, index) {
      return format(row[column.property]);
    },
    closeDialogUserVisible() {
      this.dialogUserVisible = false;
    },
    // 处理表格列过滤显示
    initColumns() {
      this.columns = [
        { prop: "id", label: "ID", minWidth: "6%" },
        { prop: "name", label: "用户名", minWidth: "13%" },
        { prop: "email", label: "邮箱", minWidth: "13%" },
        { prop: "mobile", label: "手机", minWidth: "13%" },
        {
          prop: "toolUseNum",
          label: "状态",
          minWidth: "11%",
          formatter: this.userStateFormat,
        },
        { prop: "createBy", label: "创建人", minWidth: "13%" },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: "14%",
          formatter: this.dateFormat,
        },
      ];
      this.filterColumns = this.columns;
    },
    userStateFormat(row, column, cellValue, index) {
      if (row.toolUseNum !== 0) {
        return "正常";
      } else {
        return "锁定";
      }
    },
  },
  mounted() {
    this.initColumns();
  },
};
</script>