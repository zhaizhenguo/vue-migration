<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="tabHandleClick">
    <el-tab-pane label="表" name="step4TablePane">
      <step4TablePane
        :tableHeight="tableHeight"
        @getData="getData"
        ref="step4TablePane"
      ></step4TablePane>
    </el-tab-pane>

    <el-tab-pane label="视图" name="step4ViewPane">
      <step4ViewPane
        :tableHeight="tableHeight"
        @getData="getData"
        ref="step4ViewPane"
      ></step4ViewPane>
    </el-tab-pane>

    <el-tab-pane label="序列" name="step4SequencePane"
      ><step4SequencePane
        :tableHeight="tableHeight"
        ref="step4SequencePane"
      ></step4SequencePane
    ></el-tab-pane>

    <el-tab-pane label="表空间" name="step4TableSpacePane"
      ><step4TableSpacePane
        :tableHeight="tableHeight"
        ref="step4TableSpacePane"
      ></step4TableSpacePane
    ></el-tab-pane>

    <el-tab-pane label="同义词" name="step4SynonymsPane"
      ><step4SynonymsPane
        :tableHeight="tableHeight"
        ref="step4SynonymsPane"
      ></step4SynonymsPane
    ></el-tab-pane>

    <el-tab-pane label="物化视图" name="step4MaterializedViewPane"
      ><step4MaterializedViewPane
        :tableHeight="tableHeight"
        ref="step4MaterializedViewPane"
      ></step4MaterializedViewPane
    ></el-tab-pane>

    <el-tab-pane label="存储过程" name="step4ProcedurePane"
      ><step4ProcedurePane
        :tableHeight="tableHeight"
        ref="step4ProcedurePane"
      ></step4ProcedurePane
    ></el-tab-pane>

    <el-tab-pane label="包" name="step4PackagePane"
      ><step4PackagePane
        :tableHeight="tableHeight"
        ref="step4PackagePane"
      ></step4PackagePane
    ></el-tab-pane>

    <el-tab-pane label="函数" name="step4FunctionPane"
      ><step4FunctionPane
        :tableHeight="tableHeight"
        ref="step4FunctionPane"
      ></step4FunctionPane
    ></el-tab-pane>

    <el-tab-pane label="自定义类型" name="step4UserFunctionPane"
      ><step4UserFunctionPane
        :tableHeight="tableHeight"
        ref="step4UserFunctionPane"
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
    step4UserFunctionPane: step4UserFunctionPane
  },
  data() {
    return {
      selectRow: [],
      tabPaneData: {},
      tableHeight: 457,
      sourceData: "",
      activeName: "step4TablePane"
    };
  },
  methods: {
    getData(key, value) {
      this.tabPaneData[key] = value;
    },
    handleSourceDataSelectionChange(val) {
      this.sourceData = val;
      if (this.sourceData === "ZG") {
        this.$refs[this.activeName].objData = JSON.parse(
          JSON.stringify(
            this.$refs[[this.activeName]].$options.data().objData02
          )
        );
      } else {
        this.$refs[[this.activeName]].objData = JSON.parse(
          JSON.stringify(this.$refs[[this.activeName]].$options.data().objData)
        );
      }
      console.log("this.sourceData===", this.sourceData);
    },
    tabHandleClick(tab, event) {
      this.selectRow = this.tabPaneData[this.activeName] || [];
      this.$refs[this.activeName].selectRow(this.selectRow);
      console.log(this.selectRow);
      this.handleSourceDataSelectionChange(this.sourceData);
      console.log(this.activeName);
    },
    getData() {
      return {
        objData
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
    }
  },
  created: function() {
    this.calcHeightx();
  },
  computed: {}
};
</script>
<style scoped></style>
