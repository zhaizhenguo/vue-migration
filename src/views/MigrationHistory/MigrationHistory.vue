<template>
  <div>
    <el-form
      :inline="true"
      :model="migrationQueryData"
      class="demo-form-inline"
    >
      <el-form-item label="迁移时间">
        <el-date-picker
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
          v-model="migrationQueryData.migrationState"
          placeholder="请选择"
        >
          <el-option label="成功" value="0"></el-option>
          <el-option label="失败" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="migrationQueryData.migrationInput"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryMigrationData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :stripe="true"
      @cell-dblclick="btnQueryDetails"
      class="table"
      :data="tableData"
      border
    >
      <el-table-column sortable prop="operator" label="操作人" min-width="10%">
      </el-table-column>
      <el-table-column sortable prop="IP" label="IP" min-width="10%">
      </el-table-column>
      <el-table-column
        sortable
        prop="sourceDatabase"
        label="源数据库"
        min-width="10%"
      >
      </el-table-column>

      <el-table-column
        sortable
        prop="targetDatabase"
        label="目标数据库"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="startTime"
        label="开始时间"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column sortable prop="endTime" label="结束时间" min-width="10%">
      </el-table-column>
      <el-table-column
        sortable
        prop="migrationElapsedTime"
        label="迁移用时"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="migrationState"
        label="迁移状态"
        min-width="10%"
        :formatter="migrationStateFormat"
      >
      </el-table-column>
      <el-table-column label="操作" min-width="5%">
        <template slot-scope="scope">
          <el-button
            class="fa fa-info-circle"
            type="primary"
            plain
            @click="btnQueryDetails(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float: right"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 50]"
      :page-size="10"
      layout=" prev, pager, next,sizes,total"
      :current-page="migrationData.page + 1"
      :total="migrationData.total"
      @current-change="changePage"
    >
    </el-pagination>
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
import migrationDataJson from "@/components/Constant/migrationData";
import dialogMigrationReport from "../Dialog/DialogMigrationReport";

export default {
  name: "migrationHistory",
  components: {
    dialogMigrationReport: dialogMigrationReport,
  },
  data() {
    return {
      rowData: {},
      migrationDataJson: migrationDataJson,
      migrationData: { page: null, total: null },
      tableData: [],
      migrationQueryData: {
        migrationDate: null,
        migrationState: null,
        migrationInput: null,
      },
      dialogMigrationReportVisible: false,
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
    this.queryMigrationData();
  },
  methods: {
    btnQueryDetails(row) {
      console.log("row======", row);
      this.rowData = row;
      this.dialogMigrationReportVisible = true;
    },
    closeDialogMigrationReport() {
      this.dialogMigrationReportVisible = false;
    },
    changePage(page) {
      console.log("page=======", page);
      this.queryMigrationData();
      //在element-ui中，不管点击上一页还是下一页又或是具体的某一页也好，都会使page发生改变
      //将page放入watch(侦听器)
      //当page值发生改变时，将会触发对应函数
    },
    handleSizeChange(page) {
      console.log("handleSizeChange page=======", page);
    },
    queryMigrationData() {
      console.log("migrationQueryData", this.migrationQueryData);
      api.postPay({}, (response) => {
        this.migrationData = this.migrationDataJson;
        this.tableData = this.migrationDataJson.content;
        console.log("response===", response);

        this.$message({
          message: "查询成功",
          type: "success",
        });
      });
    },
    migrationStateFormat(row) {
      if (row.migrationState === 0) {
        return "成功";
      } else {
        return "失败";
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  height: calc(80vh - 100px);
  width: 100%;
}
</style>
