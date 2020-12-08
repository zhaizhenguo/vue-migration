<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="tabHandleClick">
    <el-tab-pane label="表" name="table">
      <step4TablePane
        @getTableResourceData="getTableResourceData"
        @getSelectPaneData="getSelectPaneData"
        :tableHeight="tableHeight"
        :tableData="table"
        :checkSourcePattern="checkSourcePattern"
        ref="table"
      ></step4TablePane>
    </el-tab-pane>

    <el-tab-pane label="视图" name="view">
      <step4ViewPane
        :tableHeight="tableHeight"
        :tableData="view"
        ref="view"
        @getSelectPaneData="getSelectPaneData"
      ></step4ViewPane>
    </el-tab-pane>

    <el-tab-pane label="序列" name="sequence"
      ><step4SequencePane
        :tableHeight="tableHeight"
        :tableData="sequence"
        @getSelectPaneData="getSelectPaneData"
        ref="sequence"
      ></step4SequencePane
    ></el-tab-pane>

    <el-tab-pane label="表空间" name="tablespace"
      ><step4TableSpacePane
        :tableHeight="tableHeight"
        :tableData="tablespace"
        @getSelectPaneData="getSelectPaneData"
        ref="tablespace"
      ></step4TableSpacePane
    ></el-tab-pane>

    <el-tab-pane label="同义词" name="synonyms"
      ><step4SynonymsPane
        :tableHeight="tableHeight"
        :tableData="synonyms"
        @getSelectPaneData="getSelectPaneData"
        ref="synonyms"
      ></step4SynonymsPane
    ></el-tab-pane>

    <el-tab-pane label="物化视图" name="materializedView"
      ><step4MaterializedViewPane
        :tableHeight="tableHeight"
        :tableData="materializedView"
        @getSelectPaneData="getSelectPaneData"
        ref="materializedView"
      ></step4MaterializedViewPane
    ></el-tab-pane>

    <el-tab-pane label="存储过程" name="procedure"
      ><step4ProcedurePane
        :tableHeight="tableHeight"
        :tableData="procedure"
        @getSelectPaneData="getSelectPaneData"
        ref="procedure"
      ></step4ProcedurePane
    ></el-tab-pane>

    <el-tab-pane label="包" name="packageData"
      ><step4PackagePane
        :tableHeight="tableHeight"
        :tableData="packageData"
        @getSelectPaneData="getSelectPaneData"
        ref="packageData"
      ></step4PackagePane
    ></el-tab-pane>

    <el-tab-pane label="函数" name="functionData"
      ><step4FunctionPane
        :tableHeight="tableHeight"
        :tableData="functionData"
        @getSelectPaneData="getSelectPaneData"
        ref="functionData"
      ></step4FunctionPane
    ></el-tab-pane>

    <el-tab-pane label="自定义类型" name="userFunction"
      ><step4UserFunctionPane
        :tableHeight="tableHeight"
        :tableData="userFunction"
        @getSelectPaneData="getSelectPaneData"
        ref="userFunction"
      ></step4UserFunctionPane
    ></el-tab-pane>
  </el-tabs>
</template>
<script>
import step4TablePane from "./step4-tablePane";
import step4ViewPane from "./step4-viewPane";
import step4SequencePane from "./step4-sequencePane";
import step4TableSpacePane from "./step4-tableSpacePane";
import step4SynonymsPane from "./step4-synonymsPane";
import step4MaterializedViewPane from "./step4-materializedViewPane";
import step4ProcedurePane from "./step4-procedurePane";
import step4PackagePane from "./step4-packagePane";
import step4FunctionPane from "./step4-functionPane";
import step4UserFunctionPane from "./step4-userFunctionPane";
export default {
  components: {
    step4TablePane: step4TablePane,
    step4ViewPane: step4ViewPane,
    step4SequencePane: step4SequencePane,
    step4TableSpacePane: step4TableSpacePane,
    step4SynonymsPane: step4SynonymsPane,
    step4MaterializedViewPane: step4MaterializedViewPane,
    step4ProcedurePane: step4ProcedurePane,
    step4PackagePane: step4PackagePane,
    step4FunctionPane: step4FunctionPane,
    step4UserFunctionPane: step4UserFunctionPane,
  },
  props: {
    checkSourcePattern: {
      type: String,
      default: function () {
        return "";
      },
    },
    modleData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectModleData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      table: [],
      view: [],
      sequence: [],
      tablespace: [],
      synonyms: [],
      materializedView: [],
      procedure: [],
      packageData: [],
      functionData: [],
      userFunction: [],
      selectRow: [],
      selectPatternList: [],
      selectTableNameList: [],
      tableHeight: 457,
      sourceData: "",
      activeName: "table",
    };
  },
  methods: {
    getPaneData() {
      this.table = this.modleData[this.checkSourcePattern].table;
      this.view = this.modleData[this.checkSourcePattern].view;
      this.sequence = this.modleData[this.checkSourcePattern].sequence;
      this.tablespace = this.modleData[this.checkSourcePattern].tablespace;
      this.synonyms = this.modleData[this.checkSourcePattern].synonyms;
      this.materializedView = this.modleData[
        this.checkSourcePattern
      ].materializedView;
      this.procedure = this.modleData[this.checkSourcePattern].procedure;
      this.packageData = this.modleData[this.checkSourcePattern].packageData;
      this.functionData = this.modleData[this.checkSourcePattern].functionData;
      this.userFunction = this.modleData[this.checkSourcePattern].userFunction;
    },
    getSelectPaneData(key, value) {
      if (this.selectPatternList.indexOf(this.checkSourcePattern) === -1) {
        this.selectPatternList.push(this.checkSourcePattern);
      }
      this.selectTableNameList[this.checkSourcePattern] = [];
      value.forEach((element) => {
        this.selectTableNameList[this.checkSourcePattern].push(
          element.sourceTableName
        );
      });
      this.selectModleData[this.checkSourcePattern][key] = value;
      console.log("this.selectPatternList====", this.selectPatternList);
      console.log("this.selectTableNameList====", this.selectTableNameList);
      console.log("this.selectModleData====", this.selectModleData);
    },
    setSelectPaneData() {
      this.selectRow =
        this.selectModleData[this.checkSourcePattern][this.activeName] || [];
      this.$refs[this.activeName].selectRow(this.selectRow);
    },
    getTableResourceData(key, value, tableName) {
      console.log(
        "Top key===",
        key,
        "value===",
        value,
        "tableName===",
        tableName
      );
      let index = this.selectTableNameList[this.checkSourcePattern].indexOf(
        tableName
      );
      this.selectModleData[this.checkSourcePattern]["table"][index][
        key
      ] = value;
    },
    setTableResourceData() {},
    tabHandleClick(tab, event) {
      this.setSelectPaneData();
    },

    getData() {
      return {
        selectPatternList: this.selectPatternList,
        selectModleData: this.selectModleData,
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
<style scoped></style>
