<template>
  <div>
    <el-form
      :inline="true"
      :model="migrationQueryData"
      class="demo-form-inline"
    >
      <el-form-item label="迁移时间">
        <el-date-picker
          :size="size"
          v-model="migrationQueryData.migrationDate"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="迁移状态">
        <el-select
          :size="size"
          v-model="migrationQueryData.migrationState"
          placeholder="请选择"
        >
          <el-option label="成功" value="0"></el-option>
          <el-option label="失败" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          :size="size"
          v-model="migrationQueryData.migrationInput"
          placeholder="请输入"
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
    </el-form>

    <st-table
      ref="table"
      :data="pageResult"
      :height="'calc(80vh - 250px)'"
      :operationColumnMinWidth="'11%'"
      :columns="filterColumns"
      :showBatchDelete="false"
      :showOperationBtnCheck="true"
      :showOperationBtnEdit="false"
      :showOperationBtnDelete="false"
      @handleCheck="handleCheck"
      @dblClick="handleCheck"
      @findPage="findPage"
    >
    </st-table>
    <dialogMigrationReport
      v-if="dialogMigrationReportVisible"
      :dialogMigrationReportVisible="dialogMigrationReportVisible"
      :rowData="rowData"
      @closeDialogMigrationReport="closeDialogMigrationReport"
    ></dialogMigrationReport>
  </div>
</template>

<script>
import api from "@/components/Asset/Api";
import { format } from "@/utils/datetime";
import migrationDataJson from "@/components/Constant/migrationData";
import dialogMigrationReport from "../Dialog/DialogMigrationReport";
import StTable from "@/views/Core/StTable";
import StButton from "@/views/Core/StButton";
export default {
  name: "migrationHistory",
  components: {
    StTable: StTable,
    StButton: StButton,
    dialogMigrationReport: dialogMigrationReport,
  },
  data() {
    return {
      size: "small",
      rowData: {},
      migrationDataJson: migrationDataJson,
      tableHeight: "calc(80vh - 250px)",
      migrationQueryData: {
        migrationDate: null,
        migrationState: null,
        migrationInput: null,
      },
      dialogMigrationReportVisible: false,

      filterColumns: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResult: {},

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
    };
  },
  created() {
    this.findPage(null);
  },
  methods: {
    handleCheck(data) {
      this.rowData = JSON.parse(JSON.stringify(data.row));
      console.log("rowData======", this.rowData);
      this.dialogMigrationReportVisible = true;
    },
    closeDialogMigrationReport() {
      this.dialogMigrationReportVisible = false;
    },
    findPage(data) {
      console.log("findPage");
      if (!!data) {
        this.pageRequest = data.pageRequest;
      }
      Object.assign(this.pageRequest, this.migrationQueryData);
      console.log("pageRequest", this.pageRequest);

      api.postUser(this.pageRequest, (response) => {
        this.pageResult = this.migrationDataJson;
        console.log("pageResult", this.pageResult);
        !!data ? data.callback() : "";
      });
      this.$refs.table.doLayout();
    },

    initColumns() {
      this.columns = [
        { prop: "operator", label: "操作人", minWidth: "11%" },
        { prop: "ip", label: "IP", minWidth: "11%" },
        { prop: "sourceDatabase", label: "源数据库", minWidth: "11%" },
        { prop: "targetDatabase", label: "目标数据库", minWidth: "11%" },
        {
          prop: "startTime",
          label: "开始时间",
          minWidth: "11%",
          formatter: this.dateFormat,
        },
        {
          prop: "endTime",
          label: "结束时间",
          minWidth: "11%",
          formatter: this.dateFormat,
        },
        { prop: "migrationElapsedTime", label: "迁移用时", minWidth: "11%" },
        {
          prop: "migrationState",
          label: "迁移状态",
          minWidth: "11%",
          formatter: this.migrationStateFormat,
        },
      ];
      this.filterColumns = this.columns;
      //    JSON.parse(JSON.stringify(this.columns));
    },
    dateFormat(row, column, cellValue, index) {
      return format(row[column.property]);
    },
    migrationStateFormat(row) {
      if (row.migrationState === 0) {
        return "成功";
      } else {
        return "失败";
      }
    },
  },
  mounted() {
    this.initColumns();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
