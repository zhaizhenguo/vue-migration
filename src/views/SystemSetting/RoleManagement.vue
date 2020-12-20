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
          @click="btnAddUser"
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
      @handleEdit="btnEditUser"
      @dblClick="btnEditUser"
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
      this.pageRequest.name = this.filters.name;
      api.postUser(this.pageRequest, (response) => {
        let resData = this.findTableData(this.pageRequest);
        this.pageResult = resData.findPageData.data;
        !!data ? data.callback() : "";
      });
    },

    btnAddUser() {
      this.userDataForm = {};
      this.operation = true;
      this.dialogRoleVisible = true;
    },
    btnEditUser(data) {
      this.userDataForm = JSON.parse(JSON.stringify(data.row));
      this.operation = false;
      this.dialogRoleVisible = true;
    },
    handleDelete() {
      console.log("handleDelete");
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
      //    JSON.parse(JSON.stringify(this.columns));
    },
    findTableData(params) {
      let findPageData = {
        code: 200,
        msg: null,
        data: {},
      };
      let pageNum = 1;
      let pageSize = 8;
      if (params !== null) {
        // pageNum = params.pageNum
      }
      if (params !== null) {
        // pageSize = params.pageSize
      }
      let content = this.getContent(pageNum, pageSize);
      findPageData.data.pageNum = pageNum;
      findPageData.data.pageSize = pageSize;
      findPageData.data.totalSize = 50;
      findPageData.data.content = content;
      return {
        findPageData,
      };
    },
    getContent(pageNum, pageSize) {
      let content = [];
      for (let i = 0; i < 3; i++) {
        let obj = {};
        let index = (pageNum - 1) * pageSize + i + 1;
        obj.id = index;
        obj.name = "管理员" + index;
        obj.createBy = "admin";
        obj.remark = "此用户可展示所有菜单";
        obj.createTime = "2020-12-14 11:11:11";
        content.push(obj);
      }
      return content;
    },
  },
  mounted() {
    this.initColumns();
  },
};
</script>