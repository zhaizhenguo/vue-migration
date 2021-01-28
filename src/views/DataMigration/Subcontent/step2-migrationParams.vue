<template>
  <el-form
    ref="form"
    :rules="rules"
    label-width="100px"
    :model="migrationParams"
  >
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
        v-model="migrationParams.migErrorHandleStrategy"
        label="stop"
        >遇错停止</el-radio
      >
      <el-radio v-model="migrationParams.migErrorHandleStrategy" label="neglect"
        >遇错忽略</el-radio
      >
    </el-form-item>
    <el-form-item label="列长度倍数" style="float: left" prop="colMultFactor">
      <el-input
        v-model="migrationParams.colMultFactor"
        type="number"
      ></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import migrationParamOptions from "@/components/Constant/migrationParamOptions";
export default {
  data() {
    return {
      migrationParams: {
        checkedmigrationParams: migrationParamOptions.checkedParams,
        allTheParams: migrationParamOptions.allTheParams,
        migErrorHandleStrategy: "neglect",
        colMultFactor: 1,
      },
      rules: {
        colMultFactor: [
          { required: true, message: "请输入列长度倍数", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    getData() {
      let param;
      this.$refs.form.validate((valid) => {
        if (valid) {
          param = this.getParam();
        } else {
          param = false;
        }
      });
      return param;
    },
    getParam() {
      let param = {};
      this.migrationParams.allTheParams.forEach((element) => {
        //选中的列
        if (
          this.migrationParams.checkedmigrationParams.indexOf(element.key) != -1
        ) {
          param[element.key] = true;
        } else {
          param[element.key] = false;
        }
      });
      param[
        "migErrorHandleStrategy"
      ] = this.migrationParams.migErrorHandleStrategy;
      param["colMultFactor"] = this.migrationParams.colMultFactor;
      return param;
    },
    handleCheckedCitiesChange(value) {},
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
