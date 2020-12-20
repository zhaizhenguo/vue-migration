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
      :operationColumnMinWidth="'15%'"
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
      this.dialogUserVisible = true;
    },
    btnEditUser(data) {
      this.userDataForm = data.row;
      this.operation = false;
      this.dialogUserVisible = true;
    },
    handleDelete() {
      console.log("handleDelete");
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
        { prop: "id", label: "ID", minWidth: "5%" },
        { prop: "name", label: "用户名", minWidth: "12%" },
        { prop: "roleNames", label: "角色", minWidth: "10%" },
        { prop: "email", label: "邮箱", minWidth: "12%" },
        { prop: "mobile", label: "手机", minWidth: "12%" },
        {
          prop: "status",
          label: "状态",
          minWidth: "10%",
          formatter: this.userStateFormat,
        },
        { prop: "createBy", label: "创建人", minWidth: "12%" },
        {
          prop: "createTime",
          label: "创建时间",
          minWidth: "12%",
          formatter: this.dateFormat,
        },
      ];
      this.filterColumns = this.columns;
      //    JSON.parse(JSON.stringify(this.columns));
    },
    userStateFormat(row, column, cellValue, index) {
      if (row.status === 0) {
        return "正常";
      } else {
        return "锁定";
      }
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
      for (let i = 0; i < pageSize; i++) {
        let obj = {};
        let index = (pageNum - 1) * pageSize + i + 1;
        obj.id = index;
        obj.name = "翟振国" + index;
        obj.password = "9ec9750e709";
        obj.roleNames = "管理员";
        obj.email = "kitty" + index + "@qq.com";
        obj.mobile = "18688982323";
        obj.useNumber = 20;
        obj.status = 0;
        obj.userRoles = ["admin"];
        obj.createBy = "admin";
        obj.createTime = "2018-08-14 11:11:11";
        obj.createBy = "admin";
        obj.createTime = "2018-09-14 12:12:12";
        content.push(obj);
      }
      return content;
    },
  },
  mounted() {
    // this.findDeptTree();
    this.initColumns();
  },
};
</script>