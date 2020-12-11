// 性能参数
<template>
  <div>
    <el-row
      ><el-col :span="6">
        <div class="divCommon">
          开启迁移线程监控
          <el-switch
            @change="handleCheckedCitiesChange"
            style="margin-left: 10px"
            v-model="isOpenMonitoring"
          >
          </el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="18"
        ><div class="divCommon">
          单表进度预估策略
          <el-radio
            @change="handleCheckedCitiesChange"
            :disabled="!isOpenMonitoring"
            style="margin: 10px"
            v-model="estimateStrategy"
            label="0"
            >按数据大小</el-radio
          >
          <el-radio
            @change="handleCheckedCitiesChange"
            :disabled="!isOpenMonitoring"
            style="margin: 10px"
            v-model="estimateStrategy"
            label="1"
            >按数据行数</el-radio
          >
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpenMonitoring: false,
      estimateStrategy: "1",
    };
  },
  methods: {
    getData() {
      return this.getParam();
    },
    getParam() {
      return {
        isOpenMonitoring: this.isOpenMonitoring,
        estimateStrategy: this.estimateStrategy,
      };
    },
    handleCheckedCitiesChange(value) {
      this.$options.data().isOpenMonitoring;
      console.log(
        "migrationParams======",
        this.getParam(),
        this.$options.data().isOpenMonitoring
      );
    },
    btnclickReset() {
      this.isOpenMonitoring = this.$options.data().isOpenMonitoring;
      this.estimateStrategy = this.$options.data().estimateStrategy;
    },
  },
};
</script>
<style scoped>
.divCommon {
  color: #606266;
  font-weight: 500;
  margin-top: 20px;
}
.textDivsmall {
  padding-top: 5px;
  width: 150px;
  color: rgb(96, 98, 102);
  font-weight: 500;
  float: left;
}
</style>
