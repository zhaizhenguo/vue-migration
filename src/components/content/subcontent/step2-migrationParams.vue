<template>
  <el-form :rules="rules" label-width="100px" :model="migrationParams">
    <el-form-item label="" style="margin-left: -100px">
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
    </el-form-item>
    <el-form-item label="迁移错误策略">
      <el-radio
        style="margin-left: 15px"
        v-model="migrationParams.errorStrategy"
        label="0"
        >遇错停止</el-radio
      >
      <el-radio v-model="migrationParams.errorStrategy" label="1"
        >遇错忽略</el-radio
      >
    </el-form-item>
    <el-form-item label="列长度倍数" style="float: left" prop="lengthUnit">
      <el-input v-model="migrationParams.lengthUnit" type="number"></el-input>
    </el-form-item>
  </el-form>
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
        lengthUnit: 1,
      },
      rules: {
        lengthUnit: [
          { required: true, message: "请输入列长度倍数", trigger: "change" },
        ],
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
