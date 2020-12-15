<template>
  <el-dialog
    title="详情"
    :visible="dialogMigrationReportVisible"
    :close-on-click-modal="false"
    @close="close"
    width="800px"
  >
    <el-card>
      <z-basedescription title="" col="12">
        <Description term="操作人">{{ rowData.operator }}</Description>
        <Description term="IP">{{ rowData.ip }}</Description>
        <Description term="开始时间">{{ rowData.startTime }}</Description>
        <Description term="结束时间">{{ rowData.endTime }}</Description>
        <Description term="源数据库">{{ rowData.sourceDatabase }}</Description>
        <Description term="目标数据库">{{
          rowData.targetDatabase
        }}</Description>
      </z-basedescription>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        :stripe="true"
        :data="migrationReportDataJson"
        height="250"
        border
      >
        <el-table-column sortable prop="type" label="类型" min-width="25%">
        </el-table-column>
        <el-table-column sortable prop="count" label="总数" min-width="25%">
        </el-table-column>
        <el-table-column
          sortable
          prop="successCount"
          label="成功数"
          min-width="25%"
        >
          <template slot-scope="scope">
            <popoverRow
              :rowData="scope.row.successContent"
              :rowCount="scope.row.successCount"
            ></popoverRow>
          </template>
        </el-table-column>

        <el-table-column
          sortable
          prop="failCount"
          label="失败数"
          min-width="25%"
        >
          <template slot-scope="scope">
            <popoverRow
              :rowData="scope.row.failContent"
              :rowCount="scope.row.failCount"
            ></popoverRow>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-dialog>
</template>
<script>
import migrationReportDataJson from "@/components/Constant/migrationReportData";
import popoverRow from "@/components/PopoverRow";
export default {
  props: {
    dialogMigrationReportVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    popoverRow: popoverRow,
  },
  data() {
    return {
      migrationReportDataJson: migrationReportDataJson,
    };
  },
  created() {},
  methods: {
    queryMigrationReportData() {
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
    clickDataInfo(row) {
      console.log("row === ", row);
    },
    close() {
      this.$emit("closeDialogMigrationReport");
    },
  },
  computed: {},
};
</script>

