<template>
  <el-card style="padding: 20px 100px 20px 50px; width: 88%">
    <el-row class="databaseTitle"
      ><el-col :span="24">【{{ operationType }}】</el-col>
    </el-row>

    <el-row style="line-height: 32px; text-align: center">
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="9"
        >{{ tableData.patternName }}.{{ tableData.sourceTableName }}</el-col
      >
      <el-col :span="4" style="color: #409eff; font-size: 25px">
        <i class="el-icon-d-arrow-right"></i>
      </el-col>
      <el-col :span="10"
        >{{
          !this.targetPatternName
            ? tableData.patternName
            : this.targetPatternName
        }}.{{ tableData.targetTableName }}</el-col
      >
    </el-row>
    <el-row class="databaseTitle"
      ><el-col :span="24">【映射列】</el-col>
    </el-row>

    <el-row
      class="lineColor"
      v-for="(lineData, index) in tableData.line"
      :key="index"
      style="line-height: 32px; text-align: center"
    >
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="9">{{ lineData.sourceLineName }}</el-col>
      <el-col :span="4" style="color: #409eff; font-size: 25px">
        <i class="el-icon-d-arrow-right"></i>
      </el-col>
      <el-col :span="10">{{ lineData.targetLineName }}</el-col>
    </el-row>
  </el-card>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    patternParam: {
      type: Object,
      default: function () {
        return {};
      },
    },
    targetPatternName: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    initData() {
      console.log("this.tableData====", this.tableData);
    },
  },
  computed: {
    operationType() {
      let checkOperatingMode = this.tableData.checkOperatingMode;
      if (checkOperatingMode == "newTable") {
        return "新建表";
      } else if (checkOperatingMode == "heavyLoadData") {
        return "重载数据";
      } else if (checkOperatingMode == "addToData") {
        return "追加数据";
      }
    },
  },
};
</script>
<style scoped>
.lineColor:nth-of-type(even) {
  background-color: #f5f7fa;
}
.databaseTitle {
  font-weight: 700;
  padding: 5px 0px;
}
.databaseBody {
  padding: 5px 0px;
}
.centerContent {
  line-height: 156px;
  flex: 0.4;
  text-align: center;
  color: #409eff;
  font-size: 120px;
}
</style>