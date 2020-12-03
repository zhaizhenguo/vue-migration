<template>
  <div>
    <el-checkbox-group
      @change="handleCheckedCitiesChange"
      style=""
      v-model="migrationParams.checkedmigrationParams"
    >
      <el-checkbox
        class="lable01"
        v-for="data in migrationParams.allTheParams"
        :label="data.key"
        :key="data.key"
        :disabled="data.disabled"
        >{{ data.lable }}</el-checkbox
      >
    </el-checkbox-group>
    <div class="div01">
      迁移错误策略
      <el-radio
        style="margin-left: 15px"
        v-model="migrationParams.errorStrategy"
        label="0"
        >遇错停止</el-radio
      >
      <el-radio v-model="migrationParams.errorStrategy" label="1"
        >遇错忽略</el-radio
      >
    </div>
    <div class="div01" style="padding: 0px 0px">
      列长度倍数<el-input
        style="width: 100px; padding-left: 35px"
        v-model="migrationParams.lengthUnit"
        type="number"
      ></el-input>
    </div>
  </div>
</template>
<script>
import migrationParamOptions from "../../constant/migrationParamOptions";
export default {
  data() {
    return {
      migrationParams: {
        checkedmigrationParams: migrationParamOptions.checkedParams,
        allTheParams: migrationParamOptions.allTheParams,
        errorStrategy: "1",
        lengthUnit: 1.0,
      },
    };
  },
  methods: {
    getData() {
      return this.getParam();
    },
    getParam() {
      return {
        checkedmigrationParams: this.migrationParams.checkedmigrationParams,
        errorStrategy: this.migrationParams.errorStrategy,
        lengthUnit: this.migrationParams.lengthUnit,
      };
    },
    handleCheckedCitiesChange(value) {
      console.log("migrationParams======", this.getParam());
    },
    btnclickReset() {
      this.migrationParams = this.$options.data().migrationParams;
    },
  },
};
</script>
<style scoped>
.div01 {
  color: #606266;
  font-weight: 500;
  padding: 20px 0px;
}
.lable01 {
  width: 200px;
  margin-top: 20px;
}
</style>
