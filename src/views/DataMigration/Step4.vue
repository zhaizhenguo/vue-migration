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
              v-model="checkSourcePatternId"
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
      <el-main v-loading="loading" style="padding: 0px 20px">
        <step4Tabs
          :patternData="patternData"
          :selectPatternData="selectPatternData"
          :checkSourcePattern="checkSourcePatternName"
          :tableSpaceData="tableSpaceData"
          :tableNameList="checkSourceTableNameList"
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
      loading: false,
      //查询条件
      queryInput: "",
      tableHeight: 395,
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
      migrationCircle: [
        { value: 0, label: "迁移对象和数据" },
        { value: 1, label: "迁移对象" },
        { value: 2, label: "仅迁移表结构" },
        { value: 3, label: "仅迁移视图" },
        { value: 4, label: "仅迁移表和数据" },
        { value: 5, label: "仅迁移数据" },
      ],
      checkMigrationCircle: 0,
      outputLog: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      //表空间数据
      tableSpaceData: {},
      //选中的模式Id
      checkSourcePatternId: "",
      //源模式集合
      sourcePattern: [],
      // 选中的目标端模式id
      checkConstraintMigrate: "",
      //目标模式集合
      targetPattern: [],
      //源端模式名集合
      sourcePatternNameArray: [],
      //源端模式id name 映射关系
      sourceSchemaIdNameMap: {},
      //目标端模式id name 映射关系
      targetSchemaIdNameMap: {},
      //源端表名对象
      sourceTableName: {},
      isLoading: false,
      schemaDataNameList: [
        "tableInfos",
        "viewInfos",
        "sequences",
        "synonyms",
        "materializedViews",
        "procedures",
        "packages",
        "functionInfos",
        "typeInfos",
      ],
    };
  },
  methods: {
    async initData(sourceData) {
      if (!this.isLoading) {
        //加载所有模式
        await this.getAllPattern();
        await this.getTableSpace();
        if (!!this.sourcePattern && this.sourcePattern.length > 0) {
          //初始化
          this.sourcePattern.forEach((patternData) => {
            this.sourceTableName[patternData.oid] = [];
            this.selectPatternData[patternData.name] = {};
          });
          let id = this.sourcePattern[5].oid;
          let name = this.sourcePattern[5].name;
          await this.getPatternDataById(id, name);
          this.checkSourcePatternId = id;
        } else {
          this.$message({
            message: "源端连接下没有数据",
            type: "error",
          });
        }
        this.isLoading = true;
      }
      this.$emit("updateLoadingState");
    },
    getData() {
      let step4TabsData = this.$refs["step4Tabs"].getData();
      this.conversionParam(step4TabsData);
      step4TabsData["migrationConfigInfo"] = this.getParam();
      step4TabsData["schemaData"] = this.sourcePattern;
      return step4TabsData;
    },
    conversionParam(step4TabsData) {
      //遍历选中的模式名
      step4TabsData.selectSchemaNameList.forEach((schemaName) => {
        let schemaIndex = this.sourcePatternNameArray.indexOf(schemaName);
        let checkData = step4TabsData.selectSchemaData[schemaName];
        //将选中的数据封装到模式集合
        this.schemaDataNameList.forEach((name) => {
          this.sourcePattern[schemaIndex][name] = checkData[name];
        });
      });
    },
    getParam() {
      return {
        checkMigrationCircle: this.checkMigrationCircle,
        isOpenConstraintMigrate: this.isOpenConstraintMigrate,
        checkTargetSchemaName: this.checkTargetSchemaName,
      };
    },
    tabHandleClick(tab, event) {},
    async handleSelectionChange(val) {
      this.loading = true;
      if (!this.patternData[this.checkSourcePatternName]) {
        await this.getPatternDataById(val);
      }
      this.$refs["step4Tabs"].setSelectPaneData();
      setTimeout(() => {
        this.calcHeightx();
      }, 100);
      this.loading = false;
    },

    getAllPattern() {
      return new Promise((resolve) => {
        api.dataMigration.getAllPattern(null, (response) => {
          let res = response.data;
          if (res.code == 0) {
            this.sourcePattern = res.data.sourcePattern;
            this.targetPattern = res.data.targetPattern;
            this.sourcePatternNameArray = res.data.sourcePatternName;
            this.sourceSchemaIdNameMap = res.data.sourceSchemaIdNameMap;
            this.targetSchemaIdNameMap = res.data.targetSchemaIdNameMap;
            if (!!this.targetPattern && this.targetPattern.length > 0) {
              this.checkConstraintMigrate = this.targetPattern[0].oid;
            }
            this.$message({
              message: "加载模式信息成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "加载模式信息失败, " + res.msg,
              type: "error",
            });
          }
          resolve();
        });
      });
    },
    getTableSpace() {
      return new Promise((resolve) => {
        api.dataMigration.getTableSpace(null, (response) => {
          let res = response.data;
          if (res.code == 0) {
            this.tableSpaceData = res.data;
            this.$message({
              message: "加载表空间信息成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "加载表空间信息失败, " + res.msg,
              type: "error",
            });
          }
          resolve();
        });
      });
    },
    //通过模式ID 获取模式下信息
    getPatternDataById(id, name) {
      return new Promise((resolve) => {
        api.dataMigration.getPatternDataById({ id: id }, (response) => {
          let res = response.data;
          if (res.code == 0) {
            if (!!res.data) {
              this.$set(
                this.patternData,
                !this.checkSourcePatternName
                  ? name
                  : this.checkSourcePatternName,
                res.data.schemaInfo
              );
              this.sourceTableName[id] = res.data.tableNameList;
              this.checkSourceTableNameList;
              //   this.tableSpaceData[id] = res.data.tablespace;
            }
            this.$message({
              message: "加载模式下的信息成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "加载模式下的信息失败, " + res.msg,
              type: "error",
            });
          }
          resolve();
        });
      });
    },
    btnPointSQL() {
      this.dialogSQLDataVisible = true;
    },
    closePointSQL() {
      this.dialogSQLDataVisible = false;
    },
    getSqlData(data) {},

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
  computed: {
    //选中的源端模式名称
    checkSourcePatternName() {
      let name = this.sourceSchemaIdNameMap[this.checkSourcePatternId];
      return name;
    },
    //选中的目标端模式名称
    checkTargetSchemaName() {
      let name = this.targetSchemaIdNameMap[this.checkConstraintMigrate];
      return name;
    },
    //选中模式下的表名集合
    checkSourceTableNameList() {
      let nameList = this.sourceTableName[this.checkSourcePatternId];
      return nameList;
    },
  },
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
