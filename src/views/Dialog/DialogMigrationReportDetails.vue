<template>
  <el-dialog
    :visible="dialogMigrationReportDetailsVisible"
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
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogMigrationReportDetailsVisible: {
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
<style  scoped>
.colBorder {
  border-color: rgba(5, 5, 5, 0.8);
  border-width: 1px;
  border-style: solid;
}
</style>
