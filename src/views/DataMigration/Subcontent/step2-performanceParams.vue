<template>
  <el-form
    ref="form"
    style="padding-top: 20px"
    :rules="rules"
    label-width="150px"
    :model="form"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="源端迁移Fetch Size" prop="fetchSize">
          <el-input v-model="form.fetchSize" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="字符转换编码">
          <el-select v-model="form.charSet">
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
          <el-select v-model="form.logMode">
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
          <el-select v-model="form.transaction">
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
        <el-form-item label="迁移线程数" prop="threadCount">
          <el-input v-model="form.threadCount" type="number"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"
        ><el-form-item label="迁移方式">
          <el-radio v-model="migrationPatterns" label="0"
            >普通方式迁移</el-radio
          >
          <el-radio v-model="migrationPatterns" label="1"
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
            v-model="checkedperformanceParams"
          >
            <el-checkbox
              v-for="data in performanceParams"
              :label="data.key"
              :key="data.key"
              :disabled="data.disabled"
              >{{ data.lable }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="18"
        ><el-form-item label="其他参数">
          <el-row>
            <el-col style="width: 220px">
              <el-radio v-model="importData" label="1"
                >大批量数据导入区(单位行)</el-radio
              >
            </el-col>
            <el-col style="width: 100px; height: 38px">
              <el-form-item prop="maxRowLimits">
                <el-input
                  size="mini"
                  :disabled="importData == 0"
                  v-model="form.maxRowLimits"
                  type="number"
                ></el-input
              ></el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col style="width: 220px">
              <el-radio v-model="importData" label="0"
                >大批量数据导入缓冲区(单位M)</el-radio
              ></el-col
            ><el-col style="width: 100px"
              ><el-form-item prop="bufferSize"
                ><el-input
                  size="mini"
                  :disabled="importData == 1"
                  v-model="form.bufferSize"
                  type="number"
                ></el-input>
              </el-form-item> </el-col></el-row
        ></el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import migrationParamOptions from "@/components/Constant/migrationParamOptions";
export default {
  data() {
    return {
      form: {
        //源端迁移Fetch Size
        fetchSize: 1000,
        //字符转换编码
        charSet: "UTF8",
        //创建日志 0：是 1：否 2：与源端一致
        logMode: 1,
        //事务设置 0：自动提交 1：批提交
        transaction: 0,
        //迁移线程数
        threadCount: 5,
        //普通方式迁移
        useCommon: false,
        //true:大批量数据导入区; false:大批量数据导入缓冲区（单位M）
        isSentByRow: true,
        //大批量数据导入区
        maxRowLimits: 1000,
        //大批量数据导入缓冲区（单位M）
        bufferSize: 10,
      },
      //0:大批量数据导入区; 1:大批量数据导入缓冲区（单位M）
      importData: "0",
      //迁移方式 useCommon 0 为true 1位false
      migrationPatterns: "1",
      //迁移类型
      checkedperformanceParams: [],
      performanceParams: [
        {
          key: "isSerializable",
          lable: "强制串行化迁移索引",
          disabled: false,
        },
        { key: "isQuickMig", lable: "快速迁移", disabled: false },
      ],
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
          value: 0,
          label: "是",
        },
        {
          value: 1,
          label: "否",
        },

        {
          value: 2,
          label: "与源端一致",
        },
      ],

      transactionSetOptions: [
        {
          value: 0,
          label: "自动提交",
        },
        {
          value: 1,
          label: "批提交",
        },
      ],
      rules: {
        fetchSize: [
          {
            required: true,
            message: "请输入源端迁移Fetch Size",
            trigger: "change",
          },
        ],
        threadCount: [
          { required: true, message: "请输入迁移线程", trigger: "change" },
        ],
        maxRowLimits: [{ required: true, message: " ", trigger: "change" }],
        bufferSize: [{ required: true, message: "请输入", trigger: "change" }],
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
      let param = Object.assign({}, this.form);
      //遍历迁移类型
      this.performanceParams.forEach((element) => {
        if (this.checkedperformanceParams.indexOf(element) != -1) {
          param[element.key] = true;
        } else {
          param[element.key] = false;
        }
      });
      if (this.migrationPatterns == "0") {
        param.useCommon = true;
      } else {
        param.useCommon = false;
      }
      return param;
    },
    handleCheckedCitiesChange(value) {},
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
