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
      ref="table"
    >
      <el-table-column type="selection" min-width="2%"> </el-table-column>
      <el-table-column type="index" label="行号" min-width="2%">
      </el-table-column>
      <el-table-column
        sortable
        prop="sourceTableName"
        label="源表名"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetTableName"
        label="目标表名"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetTableName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="checkOperatingMode"
        label="操作方式"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.checkOperatingMode"
            placeholder="请选择"
          >
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
        sortable
        prop="checkTableSpace"
        label="表空间"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.checkTableSpace" placeholder="请选择">
            <el-option
              v-for="item in tableSpace"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="initSize"
        label="初始大小(K)"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="incrementSize"
        label="增长量(K)"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column sortable prop="maxSize" label="最大值" min-width="10%">
      </el-table-column>
      <el-table-column sortable prop="freeRatio" label="空闲比" min-width="10%">
      </el-table-column>
      <el-table-column
        sortable
        prop="minUseRatio"
        label="最小使用比"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="checkOutputLog"
        label="输出日志"
        min-width="10%"
        ><template slot-scope="scope">
          <el-select v-model="scope.row.checkOutputLog" placeholder="请选择">
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
      <el-table-column sortable prop="filter" label="过滤" min-width="10%">
        <template slot-scope="scope">
          <el-input v-model="scope.row.filter"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="8%">
        <template slot-scope="scope">
          <el-button
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
import dialogTableLineData from "../../dialog/dialogTableLineData";
import tableResourceData from "../../constant/step4-tableResourceData.json";
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
        return {};
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
        { value: "newTable", label: "新建表" },
        { value: "heavyLoadData", label: "重载数据" },
        { value: "addToData", label: "追加数据" },
      ],
      tableSpace: [
        { value: "SYSTEM", label: "SYSTEM" },
        { value: "UNDOTS01", label: "UNDOTS01" },
        { value: "TEMP", label: "TEMP" },
        { value: "AUDIT", label: "AUDIT" },
      ],
      outputLog: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      singleTableResourceData: {},
      tableName: "",
      tableResourceData: tableResourceData,
    };
  },
  created() {},
  methods: {
    getRowKey(row) {
      return row.primaryId;
    },
    selectRow(rows) {
      let tableRef = this.$refs.table;
      rows.forEach((row) => {
        tableRef.toggleRowSelection(row, true);
      });
      console.log("this.$refs.table.selection====", this.$refs.table.selection);
    },
    selectAll(selection) {
      this.$emit("getSelectPaneData", "table", selection);
    },
    select(selection, row) {
      console.log("select   回显后！！");
      this.$emit("getSelectPaneData", "table", selection);
    },
    getTableResourceData(key, value, tableName) {
      this.$emit("getTableResourceData", key, value, tableName);
    },
    setTableResourceData(dialogTableLineObj) {
      this.$emit("setTableResourceData", dialogTableLineObj);
    },
    celldbClick(row) {
      let tableRef = this.$refs.table;
      this.tableName = row.sourceTableName;
      tableRef.toggleRowSelection(row, true);
      this.$emit("getSelectPaneData", "table", tableRef.selection);
      this.singleTableResourceData = this.tableResourceData[
        this.checkSourcePattern
      ][this.tableName];
      console.log(
        "this.singleTableResourceData==",
        this.singleTableResourceData
      );
      this.dialogTableLineDataVisible = true;
    },
    closeTableLineDialog() {
      this.dialogTableLineDataVisible = false;
    },
    getSqlData(data) {
      console.log("parent==========", data);
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
