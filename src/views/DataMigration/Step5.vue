<template>
  <el-timeline class="timelineDiv">
    <el-timeline-item type="primary" timestamp="数据库连接信息" placement="top">
      <databaseCard ref="databaseCard"></databaseCard>
    </el-timeline-item>
    <el-timeline-item
      v-for="(tableData, index) in allTableData"
      :key="index"
      type="primary"
      timestamp="迁移对象"
      placement="top"
    >
      <movingObjectCard
        :tableData="tableData"
        :targetSchemaName="targetSchemaName"
      ></movingObjectCard>
    </el-timeline-item>

    <el-timeline-item type="primary" placement="top"></el-timeline-item>
  </el-timeline>
</template>
<script>
import databaseCard from "./Subcontent/step5-databaseCard";
import movingObjectCard from "./Subcontent/step5-movingObjectCard";
export default {
  props: {
    stepData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    databaseCard: databaseCard,
    movingObjectCard: movingObjectCard,
  },
  data() {
    return {
      allTableData: [],
      targetSchemaName: "",
    };
  },
  methods: {
    initData(sourceData) {
      this.targetSchemaName = "";
      //是否开启了强制迁移
      if (
        !!this.stepData.migrationConfigInfo &&
        this.stepData.migrationConfigInfo.isOpenConstraintMigrate
      ) {
        this.targetSchemaName = this.stepData.migrationConfigInfo.checkTargetSchemaName;
      }
      this.allTableData = [];
      // 获取所有表对象
      this.stepData.selectSchemaNameList.forEach((schemaName) => {
        let tableData = this.stepData.selectSchemaData[schemaName][
          "tableInfos"
        ];
        if (!!tableData) {
          this.allTableData = this.allTableData.concat(tableData);
        }
      });
      this.$refs.databaseCard.initData(this.stepData.databaseData);
      this.$emit("updateLoadingState");
    },
    getData() {
      return {};
    },
  },
  mounted() {
    console.log("step5 mounted 在页面加载时发起订阅");
    this.sockets.subscribe("migrationStatusMsg", (data) => {
      console.log("migrationStatusMsg========", JSON.stringify(data));
    });
  },
  created: function () {},
  computed: {},
};
</script>
<style scoped>
.timelineDiv {
  max-height: 600px;
  overflow: auto;
}
</style>
