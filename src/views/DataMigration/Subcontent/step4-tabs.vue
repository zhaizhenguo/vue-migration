<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="tabHandleClick">
    <el-tab-pane label="表" name="tableInfos">
      <step4TablePane
        @getTableResourceData="getTableResourceData"
        @setTableResourceData="setTableResourceData"
        @getSelectPaneData="getSelectPaneData"
        :tableHeight="tableHeight"
        :tableNameList="tableNameList"
        :tableData="tableData"
        :checkSourcePattern="checkSourcePattern"
        :tableSpaceData="tableSpaceData"
        ref="tableInfos"
      ></step4TablePane>
    </el-tab-pane>
    <el-tab-pane label="表空间" name="tableSpace"
      ><step4TableSpacePane
        :tableHeight="tableHeight"
        :tableData="tableSpaceData.sourceTablespace"
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
import commonPaneData from "@/components/Constant/step4CommonPane";
export default {
  components: {
    step4TablePane: step4TablePane,
    step4CommonPane: step4CommonPane,
    step4TableSpacePane: step4TableSpacePane,
  },
  props: {
    //当前所属的模式名
    checkSourcePattern: {
      type: String,
      default: function () {
        return "";
      },
    },
    //当前模式数据
    patternData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //选中的数据
    selectPatternData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //表空间数据
    tableSpaceData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //当前模式下的全量表名集合
    tableNameList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      selectRow: [],
      //选中的模式名集合
      selectPatternNameList: [],
      //选中的表名集合
      selectTableNameList: {},
      tableHeight: 447,
      sourceData: "",
      activeName: "tableInfos",
      commonPaneData: commonPaneData,
      commonPaneNameList: [
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
    //获取数据
    getData() {
      return {
        selectSchemaNameList: this.selectPatternNameList,
        selectSchemaData: this.selectPatternData,
      };
    },
    //切换tab页事件
    tabHandleClick(tab, event) {
      this.setSelectPaneData();
    },
    //封装选中的主面板数据（表、表空间、视图...）
    getSelectPaneData(key, value) {
      if (this.selectPatternNameList.indexOf(this.checkSourcePattern) === -1) {
        this.selectPatternNameList.push(this.checkSourcePattern);
      }
      this.selectPatternData[this.checkSourcePattern][key] = value;
      if (key === "tableInfos") {
        this.selectTableNameList[this.checkSourcePattern] = [];
        value.forEach((element) => {
          this.selectTableNameList[this.checkSourcePattern].push(
            element.sourceName
          );
        });
      }
    },
    //当切换主面板tab页时给选中的数据勾选
    setSelectPaneData() {
      //获取当前页面勾选的数据
      this.selectRow =
        this.selectPatternData[this.checkSourcePattern][this.activeName] || [];
      let paneIndex = this.commonPaneNameList.indexOf(this.activeName);
      //表 或 表空间
      if (paneIndex === -1) {
        this.$refs[this.activeName].selectRow(this.selectRow);
      } else {
        this.$refs["commonPane"][paneIndex].selectRow(this.selectRow);
      }
    },
    //封装dialog下选中的数据（列、索引、约束信息...）
    getTableResourceData(key, value, tableName) {
      let index = this.selectTableNameList[this.checkSourcePattern].indexOf(
        tableName
      );
      this.selectPatternData[this.checkSourcePattern]["tableInfos"][index][
        key + "temp"
      ] = value;
      //初始化的全量数据
      let realData = this.patternData[this.checkSourcePattern]["tableInfos"][
        this.tableNameList.indexOf(tableName)
      ][key];
      //修改数据选中状态
      realData.forEach((element) => {
        if (value.indexOf(element) != -1) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      });
    },
    //当dialog中切换tab页时给选中的数据勾选
    setTableResourceData(dialogTableLineObj) {
      let index = this.selectTableNameList[this.checkSourcePattern].indexOf(
        dialogTableLineObj.tableName
      );
      let rows = this.selectPatternData[this.checkSourcePattern]["tableInfos"][
        index
      ][dialogTableLineObj.activeName + "temp"];
      dialogTableLineObj.selectRow(rows);
    },
    calcHeightx() {
      let wapper = window.document.getElementsByClassName(
        "el-table__body-wrapper"
      );
      //必须加延时，要不然赋不上去值
      setTimeout(() => {
        wapper[0].style.height = this.tableHeight + "px";
      }, 100);
    },
  },
  created: function () {
    this.calcHeightx();
  },
  //   watch: {
  //     patternData: {
  //       handler(newVal, val) {
  //         console.log("=====yl====step4-tabs===val=", val);
  //         console.log("=====yl====step4-tabs==newVal==", newVal);
  //       },
  //       deep: true,
  //     },
  //     checkSourcePattern: {
  //       handler(newVal, val) {
  //         console.log("=====yl====checkSourcePattern===val=", val);
  //         console.log("=====yl====checkSourcePattern==newVal==", newVal);
  //       },
  //       deep: true,
  //     },
  //   },
  computed: {
    tableData() {
      return !this.patternData[this.checkSourcePattern]
        ? null
        : this.patternData[this.checkSourcePattern].tableInfos;
    },
  },
};
</script>
<style scoped></style>
