<template>
  <el-dialog
    title="迁移进度"
    :visible="dialogMigrationPlanVisible"
    :close-on-click-modal="false"
    @close="close"
    width="80vw"
  >
    <el-card>
      <el-progress
        :text-inside="true"
        :stroke-width="16"
        :percentage="percentageCount"
        :format="format"
      ></el-progress>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table
        :data="tableData"
        border
        stripe
        height="500px"
        style="width: 100%"
        :highlight-current-row="true"
        ref="table"
      >
        <el-table-column
          align="center"
          type="index"
          label="行号"
          min-width="1%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="patternName"
          label="模式名"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="objType"
          label="对象类型"
          min-width="12%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="objName"
          label="对象名"
          min-width="14%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="importRows"
          label="导入行数"
          min-width="8%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="exportRow"
          label="导出行数"
          min-width="8%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="schedule"
          label="进度"
          min-width="16%"
        >
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.schedule.percentage"
              :status="scope.row.schedule.status"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="elapsedTime"
          label="耗时"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="remark"
          label="备注"
          min-width="18%"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </el-dialog>
</template>
<script>
import StButton from "@/views/Core/StButton";
import StTable from "@/views/Core/StTable";
export default {
  props: {
    dialogMigrationPlanVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    migrationData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    StTable,
    StTable,
  },
  data() {
    return {
      filterColumns: [],
      percentageCount: 70,
      tableData: [
        {
          patternName: "PUBLIC",
          objType: "TABLE DEFINTION",
          objName: "TEST112233",
          importRows: "12",
          exportRow: "14",
          schedule: { percentage: 20, status: null },
          elapsedTime: "00:25:20 12",
          remark:
            "a法第三方士大夫收到发送到手动阀沙发上sad沙发上阿士大夫撒 啊啊",
        },
        {
          patternName: "PUBLIC",
          objType: "TABLE DEFINTION",
          objName: "TEST112233",
          importRows: "12",
          exportRow: "14",
          schedule: { percentage: 50, status: null },
          elapsedTime: "00:25:20 12",
          remark: "天天啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        },
        {
          patternName: "PUBLIC",
          objType: "TABLE DEFINTION",
          objName: "TEST112233",
          importRows: "12",
          exportRow: "14",
          schedule: { percentage: 0, status: null },
          elapsedTime: "00:25:20 12",
          remark: "天天啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        },
      ],
    };
  },
  created() {},
  methods: {
    format(percentage) {
      return percentage === 100
        ? `已完成 耗时:00:08:26`
        : `迁移中:${percentage}% 耗时:00:03:26`;
    },
    test() {
      setTimeout(() => {
        let innerText = window.document.getElementsByClassName(
          "el-progress-bar__innerText"
        );
        innerText[0].style.fontSize = "14px";
      }, 10);

      setTimeout(() => {
        this.tableData[0].schedule.percentage = 100;
        this.tableData[0].schedule.status = "success";
        let aa = { aa: "ss" };
        let params = Object.assign({}, aa);
        console.log(aa === params);
      }, 1000);
      setTimeout(() => {
        this.tableData[1].schedule.percentage = 90;
        this.tableData[1].schedule.status = "warning";
      }, 1500);
      setTimeout(() => {
        this.tableData[2].schedule.percentage = 75;
        this.tableData[2].schedule.status = "exception";
        this.percentageCount = 100;
        let inner = window.document.getElementsByClassName(
          "el-progress-bar__inner"
        );
        inner[0].style.backgroundColor = "#67c23a";
      }, 2000);
    },
    close() {
      this.$emit("closeDialogMigrationPlan");
    },
  },
  computed: {},
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 30) {
        return value.slice(0, 30) + "...";
      }
      return value;
    },
  },
};
</script>
<style>
.el-tooltip__popper {
  max-width: 800px;
}
</style>

