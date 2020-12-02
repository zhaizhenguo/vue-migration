<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="divCommon">
          <div class="textDiv">源端迁移Fetch Size</div>
          <el-input
            class="elementDiv"
            v-model="fetchSize"
            type="number"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="divCommon">
          <div class="textDivsmall">字符转换编码</div>
          <el-select
            v-model="encodingValue"
            class="elementDiv"
            placeholder="请选择"
          >
            <el-option
              v-for="item in encodingOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="divCommon">
          <div class="textDivsmall">创建日志</div>
          <el-select
            v-model="createLogValue"
            class="elementDiv"
            placeholder="请选择"
          >
            <el-option
              v-for="item in createLogOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
      <el-col :span="6"
        ><div class="divCommon">
          <div class="textDivsmall">事务设置</div>
          <el-select
            v-model="transactionSetValue"
            class="elementDiv"
            placeholder="请选择"
          >
            <el-option
              v-for="item in transactionSetOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select></div
      ></el-col>
    </el-row>
    <el-row
      ><el-col :span="6">
        <div class="divCommon">
          <div class="textDiv">迁移线程数</div>
          <el-input
            class="elementDiv"
            v-model="threadSize"
            type="number"
          ></el-input>
        </div>
      </el-col>
      <el-col :span="8"
        ><div class="divCommon">
          <div class="textDivsmall">迁移方式</div>
          <el-radio
            style="margin-top: 10px"
            v-model="migrationPatterns"
            label="0"
            >普通方式迁移</el-radio
          >
          <el-radio
            style="margin-top: 10px"
            v-model="migrationPatterns"
            label="1"
            >大于buffer的行数据使用普通方式迁移</el-radio
          >
        </div></el-col
      >
    </el-row>

    <el-row>
      <el-col :span="1" class="divCommon textDiv"> 其他参数</el-col>
      <el-col :span="4">
        <div class="divCommon" style="margin-top: 15px">
          <el-checkbox-group
            @change="handleCheckedCitiesChange"
            v-model="checkedperformanceParams"
          >
            <el-checkbox
              class="lable01"
              v-for="data in performanceParams"
              :label="data.key"
              :key="data.key"
              :disabled="data.disabled"
              >{{ data.lable }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-col>
      <el-col :span="6"
        ><div class="divCommon" style="margin-top: 15px; margin-left: -10px">
          <el-radio v-model="importData" style="margin-right: 0px" label="1"
            >大批量数据导入区</el-radio
          ><el-input
            :disabled="importData == 0"
            class="elementDiv"
            v-model="importLineSize"
            type="number"
          ></el-input>
          <el-radio v-model="importData" style="margin-right: 0px" label="0"
            >大批量数据导入缓冲区(单位M)</el-radio
          ><el-input
            :disabled="importData == 1"
            class="elementDiv"
            v-model="importBufferSize"
            type="number"
          ></el-input></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import migrationParamOptions from "../constant/migrationParamOptions";
export default {
  data() {
    return {
      checkedperformanceParams: [],
      performanceParams: [
        { key: "forceMove", lable: "强制串行化迁移索引", disabled: false },
        { key: "quickMove", lable: "快速迁移", disabled: false },
      ],
      fetchSize: 1000,
      threadSize: 5,
      migrationPatterns: "1",
      importData: "0",
      importBufferSize: "10",
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
      encodingValue: "GBK",
      createLogValue: "1",
      transactionSetValue: "0",
    };
  },
  methods: {
    getData() {
      return this.getParam();
    },
    getParam() {
      return {
        //源端迁移Fetch Size
        fetchSize: this.fetchSize,
        //字符转换编码
        encodingValue: this.encodingValue,
        //创建日志 0：是 1：否 2：与源端一致
        createLogValue: this.createLogValue,
        //事务设置 0：自动提交 1：批提交
        transactionSetValue: this.transactionSetValue,
        //迁移线程数
        threadSize: this.threadSize,
        //迁移方式
        migrationPatterns: this.migrationPatterns,
        //迁移类型
        checkedperformanceParams: this.checkedperformanceParams,
        //0:大批量数据导入区; 1:大批量数据导入缓冲区（单位M）
        importData: this.importData,
        //大批量数据导入区
        importLineSize: this.importLineSize,
        //大批量数据导入缓冲区（单位M）
        importBufferSize: this.importBufferSize,
      };
    },
    handleCheckedCitiesChange(value) {
      console.log("migrationParams======", this.getParam());
    },
    btnclickReset() {
      this.checkedperformanceParams = this.$options.data().checkedperformanceParams;
      this.performanceParams = this.$options.data().performanceParams;
      this.fetchSize = this.$options.data().fetchSize;
      this.threadSize = this.$options.data().threadSize;
      this.migrationPatterns = this.$options.data().migrationPatterns;
      this.importData = this.$options.data().importData;
      this.importBufferSize = this.$options.data().importBufferSize;
      this.importLineSize = this.$options.data().importLineSize;
      this.encodingOptions = this.$options.data().encodingOptions;
      this.createLogOptions = this.$options.data().createLogOptions;
      this.transactionSetOptions = this.$options.data().transactionSetOptions;
      this.encodingValue = this.$options.data().encodingValue;
      this.createLogValue = this.$options.data().createLogValue;
      this.transactionSetValue = this.$options.data().transactionSetValue;
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
