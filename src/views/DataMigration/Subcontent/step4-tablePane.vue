<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      :height="tableHeight"
      style="width: 100%"
      :highlight-current-row="true"
      @cell-dblclick="celldbClick"
      @select-all="selectAll"
      @select="select"
      ref="tableInfos"
    >
      <el-table-column align="center" type="selection" min-width="1%">
      </el-table-column>
      <el-table-column align="center" type="index" label="行号" min-width="1%">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="sourceName"
        label="源表名"
        min-width="9%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="targetName"
        label="目标表名"
        min-width="12%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.targetName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="mode"
        label="操作方式"
        min-width="9%"
      >
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.mode" placeholder="请选择">
            <el-option
              v-for="item in operatingMode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="checkTableSpace"
        label="表空间"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.tableSpace"
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableSpaceData.targetTablespace"
              :key="item.sourceName"
              :label="item.targetName"
              :value="item.sourceName"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="tableSegmentInit"
        label="初始大小(K)"
        min-width="7%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="tableSegmentNext"
        label="增长量(K)"
        min-width="6%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="tableSegmentMax"
        label="最大值"
        min-width="5%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="tablePctFree"
        label="空闲比"
        min-width="5%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="tablePctUsed"
        label="最小使用比"
        min-width="7%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="tableLoging"
        label="输出日志"
        min-width="7%"
        ><template slot-scope="scope">
          <el-select
            size="mini"
            v-model="scope.row.tableLoging"
            placeholder="请选择"
          >
            <el-option
              v-for="item in outputLog"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="whereStr"
        label="过滤"
        min-width="7%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.whereStr"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="7%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-setting"
            type="primary"
            plain
            @click="celldbClick(scope.row)"
            >设置</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <dialogTableLineData
      v-if="dialogTableLineDataVisible"
      ref="dialogTableLine"
      :dialogTableLineDataVisible="dialogTableLineDataVisible"
      :tableName="tableName"
      :singleTableResourceData="singleTableResourceData"
      @getTableResourceData="getTableResourceData"
      @setTableResourceData="setTableResourceData"
      @closeTableLineDialog="closeTableLineDialog"
    ></dialogTableLineData>
  </div>
</template>
<script>
import dialogTableLineData from "../../Dialog/DialogTableLineData";
import tableResourceData from "@/components/Constant/step4-tableResourceData.json";
import api from "@/components/Asset/Api";
export default {
  props: {
    tableHeight: {
      type: Number,
      default: function () {
        return 500;
      },
    },
    checkSourcePattern: {
      type: String,
      default: function () {
        return "";
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //表空间数据
    tableSpaceData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //当前模式下的表名集合
    tableNameList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    dialogTableLineData: dialogTableLineData,
    tableResourceData: tableResourceData,
  },
  data() {
    return {
      isOpenSwitch: false,
      dialogTableLineDataVisible: false,
      operatingMode: [
        { value: 1, label: "新建表" },
        { value: 2, label: "重载数据" },
        { value: 4, label: "追加数据" },
      ],
      outputLog: [
        { value: "YESLOG", label: "是" },
        { value: "NOLOG", label: "否" },
      ],
      singleTableResourceData: {},
      tableName: "",
      tableResourceData: tableResourceData,
      tableProperty: [
        "targetSchema",
        "primarykey",
        "indexInfos",
        "checkInfos",
        "foreignKeys",
        "uniqueInfos",
        "triggers",
        "fullIndexInfos",
        "tableSegmentInit",
        "tableSegmentNext",
        "tableSegmentMax",
        "tablePctFree",
        "tablePctUsed",
        "columns",
        "partitionInfo",
        "isCommon",
        "hasLoadData",
        "isEdit",
        "hasLoadCheck",
        "hasLoadForeignKey",
        "hasLoadUnique",
        "hasLoadIndex",
        "hasLoadTrigger",
        "hasLoadFullIndex",
        "hasLoadPartitionInfo",
        "hasLoadPartitionIndexInfo",
        "hasLob",
        "recordStates",
        "noNullCol",
        "OverFlowNumber",
        "isNormal",
        "isMappingError",
        "type",
        "definition",
        "sourceName",
        "optionDefinition",
        "commentDefinition",
      ],
    };
  },

  created() {},
  mounted() {},
  methods: {
    getRowKey(row) {
      return row.primaryId;
    },
    selectRow(rows) {
      let tableRef = this.$refs.tableInfos;
      rows.forEach((row) => {
        tableRef.toggleRowSelection(row, true);
      });
    },
    selectAll(selection) {
      this.$emit("getSelectPaneData", "tableInfos", selection);
    },
    select(selection, row) {
      this.$emit("getSelectPaneData", "tableInfos", selection);
    },
    getTableResourceData(key, value, tableName) {
      this.$emit("getTableResourceData", key, value, tableName);
    },
    setTableResourceData(dialogTableLineObj) {
      this.$emit("setTableResourceData", dialogTableLineObj);
    },
    async celldbClick(row) {
      let tableRef = this.$refs.tableInfos;
      this.tableName = row.sourceName;
      //将此行选中
      tableRef.toggleRowSelection(row, true);
      this.$emit("getSelectPaneData", "tableInfos", tableRef.selection);
      let param = {
        patternName: this.checkSourcePattern,
        tableName: this.tableName,
      };
      //查找当前表索引
      let tableIndex = this.tableNameList.indexOf(this.tableName);
      let selectTableDetails = null;
      let checkTableData = this.tableData[tableIndex];
      if (!checkTableData.isUpload) {
        //获取表下的所有信息
        selectTableDetails = await this.getAllTableData(param);
        //赋值给全量数据
        this.tableProperty.forEach((property) => {
          checkTableData[property] = selectTableDetails[property];
        });
        //修改加载状态
        checkTableData.isUpload = true;
        //初始化数据和全选状态
        selectTableDetails.isSelectAllLineRow = true;
      } else {
        //修改加载状态
        selectTableDetails = checkTableData;
        selectTableDetails.isSelectAllLineRow = false;
      }
      this.singleTableResourceData = selectTableDetails;
      this.dialogTableLineDataVisible = true;
    },
    getAllTableData(param) {
      return new Promise((resolve) => {
        api.dataMigration.getAllTableData(param, (response) => {
          let res = response.data;
          if (res.code == 0) {
            this.$message({
              message: "加载表下所有信息成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "加载表下所有信息失败, " + res.msg,
              type: "error",
            });
          }
          resolve(res.data);
        });
      });
    },
    closeTableLineDialog() {
      this.dialogTableLineDataVisible = false;
    },
    getSqlData(data) {
      "parent==========", data;
    },
    getData() {
      return {
        objData,
      };
    },
  },
  computed: {},
  created() {},
};
</script>
<style scoped>
.qzqy {
  padding-left: 50px;
  line-height: 32px;
  width: auto;
}
.btnCom {
  width: 120px;
  margin-left: 20px;
}
</style>
