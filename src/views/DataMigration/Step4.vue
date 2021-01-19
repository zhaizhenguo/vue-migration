<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <el-row
          ><el-col :span="5"
            >源模式
            <el-select
              class="selectDiv"
              @change="handleSelectionChange"
              v-model="checkSourcePattern"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sourcePattern"
                :key="item.oid"
                :label="item.name"
                :value="item.oid"
              >
              </el-option>
            </el-select> </el-col
          ><el-col :span="5"
            >迁移范围
            <el-select class="selectDiv" v-model="checkMigrationCircle">
              <el-option
                v-for="item in migrationCircle"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3"
            ><el-input v-model="queryInput" placeholder="请输入"></el-input
          ></el-col>
          <el-col :span="1" style="margin-left: 5px"
            ><el-button type="primary" :loading="false">查询</el-button></el-col
          >
          <el-col :span="2" class="btnCom">
            <el-upload
              plain
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            >
              <el-button size="small" type="primary">快速选择对象</el-button>
            </el-upload>
          </el-col>
          <el-col :span="2" style="width: 120px">
            <el-button type="primary" @click="btnPointSQL()"
              >SQL查询迁移</el-button
            ></el-col
          ><el-col :span="2">
            <el-upload
              plain
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
            >
              <el-button size="small" type="primary"
                >查询迁移批量导入</el-button
              >
            </el-upload>
          </el-col>
        </el-row>
        <el-row
          ><el-col :span="3" class="qzqy">
            开启强制迁移
            <el-switch v-model="isOpenConstraintMigrate"> </el-switch>
            <div
              style="float: right; padding: 0px 10px"
              v-show="isOpenConstraintMigrate"
            >
              迁移到
              <el-select
                :disabled="!isOpenConstraintMigrate"
                class="selectDiv"
                v-model="checkConstraintMigrate"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in targetPattern"
                  :key="item.oid"
                  :label="item.name"
                  :value="item.oid"
                >
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0px 20px">
        <step4Tabs
          :patternData="patternData"
          :selectPatternData="selectPatternData"
          :checkSourcePattern="checkSourcePattern"
          ref="step4Tabs"
        ></step4Tabs>
      </el-main>
    </el-container>
    <dialogSQLData
      v-if="dialogSQLDataVisible"
      :dialogSQLDataVisible="dialogSQLDataVisible"
      @closePointSQL="closePointSQL"
      @getSqlData="getSqlData"
    ></dialogSQLData>
  </div>
</template>
<script>
import objData from "@/components/Constant/step4Tab";
import objData02 from "@/components/Constant/step4Tab02";
import objDataView from "@/components/Constant/step5Tab";
import objDataView02 from "@/components/Constant/step5Tab02";
import dialogSQLData from "../Dialog/DialogSQLData";
import step4Tabs from "./Subcontent/step4-tabs";
import api from "@/components/Asset/Api";
export default {
  components: {
    dialogSQLData: dialogSQLData,
    step4Tabs: step4Tabs,
  },
  data() {
    return {
      objData: objData,
      objData02: objData02,
      objDataView: objDataView,
      objDataView02: objDataView02,
      //查询条件
      queryInput: "",
      tableHeight: 570,
      isOpenConstraintMigrate: false,
      dialogSQLDataVisible: false,
      //加载过得的所有信息
      patternData: {},
      //选中的信息
      selectPatternData: {},
      patternParam: {},
      operatingMode: [
        { value: "newTable", label: "新建表" },
        { value: "heavyLoadData", label: "重载数据" },
        { value: "addToData", label: "追加数据" },
      ],
      checkConstraintMigrate: "SYSDBA111",
      constraintMigrate: [
        { value: "SYSDBA111", label: "SYSDBA111" },
        { value: "ZG111", label: "ZG111" },
      ],
      migrationCircle: [
        { value: "objectsAndData", label: "迁移对象和数据" },
        { value: "object", label: "迁移对象" },
        { value: "onlyTabStructure", label: "仅迁移表结构" },
        { value: "onlyView", label: "仅迁移识图" },
        { value: "onlyTabAndData", label: "仅迁移表和数据" },
        { value: "onlyData", label: "仅迁移数据" },
      ],
      checkMigrationCircle: "objectsAndData",
      outputLog: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      //源模式集合
      sourcePattern: [],
      //目标模式集合
      targetPattern: [],
      //选中的模式名称
      checkSourcePattern: "",
      isInitData: false,
    };
  },
  methods: {
    tabHandleClick(tab, event) {},
    handleSelectionChange(val) {
      if (!this.patternData[this.checkSourcePattern]) {
        this.patternData[this.checkSourcePattern] = this.getPatternDataByName(
          this.checkSourcePattern
        );
      }
      this.$nextTick(() => {
        this.$refs["step4Tabs"].setSelectPaneData();
      });
    },
    async initData(sourceData) {
      //   if (!this.isInitData) {
      await this.getAllPattern();
      console.log("this.sourcePattern===", this.sourcePattern);
      // setTimeout(() => {
      console.log("等待中。。。。");
      this.sourcePattern.forEach((patternData) => {
        this.selectPatternData[patternData.name] = {};
      });
      console.log("this.sourcePattern====", this.sourcePattern);
      let patternName = this.sourcePattern[0].name;
      this.checkSourcePattern = patternName;
      if (!!this.sourcePattern && this.sourcePattern.length > 0) {
        this.patternData[patternName] = this.getPatternDataByName(patternName);
      }
      // }, 2000);

      this.isInitData = true;
      //   }
    },
    getAllPattern() {
      return new Promise((resolve) => {
        api.dataMigration.getAllPattern(null, (response) => {
          let res = response.data;
          if (res.code == 0) {
            console.log("res.data===", res.data);
            this.sourcePattern = res.data.sourcePattern;
            this.targetPattern = res.data.targetPattern;
            this.$message({
              message: "加载模式信息成功",
              type: "success",
            });
            this.isInit = true;
          } else {
            this.$message({
              message: "加载模式信息失败, " + res.msg,
              type: "error",
            });
          }
          resolve("resolved2");
        });
      });
    },
    getPatternDataByName(patternName) {
      api.dataMigration.getPatternDataByName(
        { patternName: patternName },
        (response) => {
          let res = response.data;
          if (res.code == 0) {
            console.log("res.data===", res.data);
            this.$message({
              message: "加载模式下的信息成功",
              type: "success",
            });
            this.isInit = true;
          } else {
            this.$message({
              message: "加载模式下的信息失败, " + res.msg,
              type: "error",
            });
          }
        }
      );
      setTimeout(() => {}, 1000);

      //   return patternName === "SYSDBA"
      //     ? {
      //         table: this.objData,
      //         view: this.objDataView,
      //         sequence: this.objDataView,
      //         tableSpace: this.objDataView,
      //         synonyms: this.objDataView,
      //         materializedView: this.objDataView,
      //         procedure: this.objDataView,
      //         packageData: this.objDataView,
      //         functionData: this.objDataView,
      //         userFunction: this.objDataView,
      //       }
      //     : {
      //         table: this.objData02,
      //         view: this.objDataView02,
      //         sequence: this.objDataView02,
      //         tableSpace: this.objDataView02,
      //         synonyms: this.objDataView02,
      //         materializedView: this.objDataView02,
      //         procedure: this.objDataView02,
      //         packageData: this.objDataView02,
      //         functionData: this.objDataView02,
      //         userFunction: this.objDataView02,
      //       };
    },
    btnPointSQL() {
      this.dialogSQLDataVisible = true;
    },
    closePointSQL() {
      this.dialogSQLDataVisible = false;
    },
    getSqlData(data) {},
    getData() {
      let step4TabsData = this.$refs["step4Tabs"].getData();
      step4TabsData["patternParam"] = this.getParam();
      return step4TabsData;
    },
    getParam() {
      return {
        checkMigrationCircle: this.checkMigrationCircle,
        isOpenConstraintMigrate: this.isOpenConstraintMigrate,
        checkConstraintMigrate: this.checkConstraintMigrate,
      };
    },
    calcHeightx() {
      let wapper = window.document.getElementsByClassName(
        "el-table__body-wrapper"
      );
      //必须加延时，要不然赋不上去值
      setTimeout(() => {
        //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
        wapper[0].style.height = this.tableHeight + "px";
      }, 100);
    },
  },
  created: function () {
    this.calcHeightx();
  },
  computed: {},
};
</script>
<style scoped>
.qzqy {
  padding: 10px 0px;
  height: 50px;
  line-height: 32px;
  width: auto;
}
.btnCom {
  width: 120px;
  margin-left: 20px;
}
.selectDiv {
  width: 65%;
}
</style>
