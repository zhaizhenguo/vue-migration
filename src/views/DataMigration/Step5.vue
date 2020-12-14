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
        :patternParam="patternParam"
        :targetPatternName="targetPatternName"
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
      targetPatternName: "",
    };
  },
  methods: {
    initData(sourceData) {
      this.targetPatternName = "";
      if (
        !!this.stepData.patternParam &&
        this.stepData.patternParam.isOpenConstraintMigrate
      ) {
        this.targetPatternName = this.stepData.patternParam.checkConstraintMigrate;
      }
      console.log("this.targetPatternName===", this.targetPatternName);
      this.allTableData = [];
      this.stepData.patternNameList.forEach((element) => {
        let tableData = this.stepData.patternData[element]["table"];
        if (!!tableData) {
          this.allTableData = this.allTableData.concat(tableData);
        }
      });
      console.log("allTableData=====", this.allTableData);

      this.$refs.databaseCard.initData(this.stepData.databaseData);
    },
    getData() {
      return {};
    },
  },
  created: function () {},
  computed: {
    patternParam() {
      return this.stepData.patternParam;
    },
  },
};
</script>
<style scoped>
.timelineDiv {
  max-height: 600px;
  overflow: auto;
}
</style>
