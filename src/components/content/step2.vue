<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="迁移参数" name="first">
      <el-checkbox-group
        @change="handleCheckedCitiesChange"
        style="padding: 30px 100px 10px"
        v-model="checkedmigrationParams"
      >
        <el-checkbox
          class="lable01"
          v-for="data in migrationParams"
          :label="data.key"
          :key="data.key"
          :disabled="data.disabled"
          >{{ data.lable }}</el-checkbox
        >
      </el-checkbox-group>
      <div style="color: #606266; font-weight: 500; padding: 10px 100px">
        迁移错误策略
        <el-radio style="margin-left: 15px" v-model="errorStrategy" label="0"
          >遇错停止</el-radio
        >
        <el-radio v-model="errorStrategy" label="1">遇错忽略</el-radio>
      </div>
      <div style="color: #606266; font-weight: 500; padding: 10px 100px">
        列长度倍数<el-input
          style="width: 100px; padding-left: 35px"
          v-model="lengthUnit"
          type="number"
        ></el-input>
      </div>
    </el-tab-pane>
    <el-tab-pane label="性能参数" name="second">性能参数</el-tab-pane>
    <el-tab-pane label="迁移监控参数" name="third">迁移监控参数</el-tab-pane>
  </el-tabs>
</template>
<script>
import migrationParamOptions from "../constant/migrationParamOptions";
export default {
  data() {
    return {
      activeName: "first",
      checkedmigrationParams: migrationParamOptions.checkedParams,
      migrationParams: migrationParamOptions.allTheParams,
      errorStrategy: "1",
      lengthUnit: 1.0,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getData() {
      return this.getParam();
    },
    getParam() {
      return {
        checkedmigrationParams: this.checkedmigrationParams,
        errorStrategy: this.errorStrategy,
        lengthUnit: this.lengthUnit,
      };
    },
    handleCheckedCitiesChange(value) {
      console.log("migrationParams======", this.getParam());
    },
  },
};
</script>
<style scoped>
.lable01 {
  width: 200px;
  margin-top: 20px;
}
</style>
