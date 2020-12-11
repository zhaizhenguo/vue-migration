<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="tabHandleClick">
    <el-tab-pane label="表" name="table">
      <step4TablePane
        @getTableResourceData="getTableResourceData"
        @setTableResourceData="setTableResourceData"
        @getSelectPaneData="getSelectPaneData"
        :tableHeight="tableHeight"
        :tableData="
          !patternData[this.checkSourcePattern]
            ? null
            : patternData[this.checkSourcePattern].table
        "
        :checkSourcePattern="checkSourcePattern"
        ref="table"
      ></step4TablePane>
    </el-tab-pane>
    <el-tab-pane label="表空间" name="tableSpace"
      ><step4TableSpacePane
        :tableHeight="tableHeight"
        :tableData="
          !patternData[this.checkSourcePattern]
            ? null
            : patternData[this.checkSourcePattern].tableSpace
        "
        @getSelectPaneData="getSelectPaneData"
        ref="tableSpace"
      ></step4TableSpacePane
    ></el-tab-pane>

    <el-tab-pane
      v-for="(item, index) in commonPaneData"
      :key="index"
      :label="item.paneLabel"
      :name="item.paneName"
    >
      <step4CommonPane
        :tableHeight="tableHeight"
        :tableData="
          !patternData[checkSourcePattern]
            ? null
            : patternData[checkSourcePattern][item.paneName]
        "
        :headerData="item.headerData"
        :paneName="item.paneName"
        ref="commonPane"
        @getSelectPaneData="getSelectPaneData"
      ></step4CommonPane>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import step4TablePane from "./step4-tablePane";
import step4CommonPane from "./step4-commonPane";
import step4TableSpacePane from "./step4-tableSpacePane";
import commonPaneData from "./../../constant/step4CommonPane";
export default {
  components: {
    step4TablePane: step4TablePane,
    step4CommonPane: step4CommonPane,
    step4TableSpacePane: step4TableSpacePane,
  },
  props: {
    checkSourcePattern: {
      type: String,
      default: function () {
        return "";
      },
    },
    patternData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    selectPatternData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      selectRow: [],
      selectPatternNameList: [],
      selectTableNameList: {},
      tableHeight: 457,
      sourceData: "",
      activeName: "table",
      commonPaneData: commonPaneData,
      commonPaneNameList: [
        "view",
        "sequence",
        "synonyms",
        "materializedView",
        "procedure",
        "packageData",
        "functionData",
        "userFunction",
      ],
    };
  },
  methods: {
    getSelectPaneData(key, value) {
      if (this.selectPatternNameList.indexOf(this.checkSourcePattern) === -1) {
        this.selectPatternNameList.push(this.checkSourcePattern);
      }
      this.selectPatternData[this.checkSourcePattern][key] = value;

      console.log("key====", key);
      console.log("value====", value);

      console.log("this.selectPatternNameList====", this.selectPatternNameList);
      console.log("this.selectTableNameList====", this.selectTableNameList);
      console.log("this.selectPatternData====", this.selectPatternData);
      if (key === "table") {
        this.selectTableNameList[this.checkSourcePattern] = [];
        value.forEach((element) => {
          this.selectTableNameList[this.checkSourcePattern].push(
            element.sourceTableName
          );
        });
      }
    },
    setSelectPaneData() {
      this.selectRow =
        this.selectPatternData[this.checkSourcePattern][this.activeName] || [];
      console.log("setSelectPaneData  selectRow===", this.selectRow);
      let paneIndex = this.commonPaneNameList.indexOf(this.activeName);
      console.log("setSelectPaneData  paneIndex===", paneIndex);
      if (paneIndex === -1) {
        this.$refs[this.activeName].selectRow(this.selectRow);
      } else {
        this.$refs["commonPane"][paneIndex].selectRow(this.selectRow);
      }
    },
    getTableResourceData(key, value, tableName) {
      let index = this.selectTableNameList[this.checkSourcePattern].indexOf(
        tableName
      );
      this.selectPatternData[this.checkSourcePattern]["table"][index][
        key
      ] = value;
      console.log(
        "getTableResourceData  this.selectPatternData====",
        this.selectPatternData
      );
    },
    setTableResourceData(dialogTableLineObj) {
      let index = this.selectTableNameList[this.checkSourcePattern].indexOf(
        dialogTableLineObj.tableName
      );
      let rows = this.selectPatternData[this.checkSourcePattern]["table"][
        index
      ][dialogTableLineObj.activeName];
      dialogTableLineObj.selectRow(rows);
    },
    tabHandleClick(tab, event) {
      this.setSelectPaneData();
    },

    getData() {
      return {
        selectPatternNameList: this.selectPatternNameList,
        selectPatternData: this.selectPatternData,
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
