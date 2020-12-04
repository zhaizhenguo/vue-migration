<template>
  <el-form :rules="rules" label-width="200px" v-model="form">
    <el-row>
      <el-col :span="6">
        <el-form-item label="源端迁移Fetch Size" prop="fetchSize">
          <el-input v-model="form.fetchSize" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="字符转换编码">
          <el-select v-model="form.encodingValue">
            <el-option
              v-for="item in encodingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select></el-form-item
      ></el-col>
      <el-col :span="6"
        ><el-form-item label="创建日志">
          <el-select v-model="form.createLogValue">
            <el-option
              v-for="item in createLogOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select></el-form-item
      ></el-col>
      <el-col :span="6"
        ><el-form-item label="事务设置">
          <el-select v-model="form.transactionSetValue">
            <el-option
              v-for="item in transactionSetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select></el-form-item
      ></el-col>
    </el-row>
    <el-row
      ><el-col :span="6">
        <el-form-item label="迁移线程数" prop="threadSize">
          <el-input v-model="form.threadSize" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"
        ><el-form-item label="迁移方式">
          <el-radio v-model="form.migrationPatterns" label="0"
            >普通方式迁移</el-radio
          >
          <el-radio v-model="form.migrationPatterns" label="1"
            >大于buffer的行数据使用普通方式迁移</el-radio
          >
        </el-form-item></el-col
      >
    </el-row>

    <el-row>
      <el-col :span="6">
        <el-form-item label="其他参数">
          <el-checkbox-group
            @change="handleCheckedCitiesChange"
            v-model="form.checkedperformanceParams"
          >
            <el-checkbox
              v-for="data in form.performanceParams"
              :label="data.key"
              :key="data.key"
              :disabled="data.disabled"
              >{{ data.lable }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="10"
        ><el-form-item label="其他参数">
          <el-radio v-model="form.importData" label="1"
            >大批量数据导入区</el-radio
          ><el-input
            size="mini"
            :disabled="form.importData == 0"
            v-model="form.importLineSize"
            type="number"
          ></el-input>
          <el-radio v-model="form.importData" label="0"
            >大批量数据导入缓冲区(单位M)</el-radio
          ><el-input
            :disabled="form.importData == 1"
            v-model="form.importBufferSize"
            type="number"
          ></el-input></el-form-item
      ></el-col>
    </el-row>
  </el-form>
</template>
<script>
import migrationParamOptions from "../../constant/migrationParamOptions";
export default {
  data() {
    return {
      form: {
        //源端迁移Fetch Size
        fetchSize: 1000,
        //字符转换编码
        encodingValue: "GBK",
        //创建日志 0：是 1：否 2：与源端一致
        createLogValue: "1",
        //事务设置 0：自动提交 1：批提交
        transactionSetValue: "0",
        //迁移线程数
        threadSize: 5,
        //迁移方式
        migrationPatterns: "1",
        //迁移类型
        checkedperformanceParams: [],
        performanceParams: [
          { key: "forceMove", lable: "强制串行化迁移索引", disabled: false },
          { key: "quickMove", lable: "快速迁移", disabled: false },
        ],
        //0:大批量数据导入区; 1:大批量数据导入缓冲区（单位M）
        importData: "0",
        //大批量数据导入区
        importLineSize: "1000",
        encodingOptions: [
          {
            value: "GBK",
            label: "GBK",
          },
          {
            value: "UTF-8",
            label: "UTF-8",
          },
        ],
        createLogOptions: [
          {
            value: "0",
            label: "是",
          },
          {
            value: "1",
            label: "否",
          },

          {
            value: "2",
            label: "与源端一致",
          },
        ],
        transactionSetOptions: [
          {
            value: "0",
            label: "自动提交",
          },
          {
            value: "1",
            label: "批提交",
          },
        ],

        //大批量数据导入缓冲区（单位M）
        importBufferSize: "10",
      },
    };
  },
  methods: {
    getData() {
      return { form };
    },
    handleCheckedCitiesChange(value) {
      console.log("migrationParams======", { form });
    },
    btnclickReset() {
      this.form = this.$options.data().form;
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

.lable01 {
  width: 150px;
  margin-top: 8px;
}

.textDiv {
  padding-top: 5px;
  width: 150px;
  color: rgb(96, 98, 102);
  font-weight: 500;
  float: left;
}
.textDivsmall {
  padding-top: 5px;
  width: 120px;
  color: rgb(96, 98, 102);
  font-weight: 500;
  float: left;
}
.elementDiv {
  width: 150px;
}
</style>
