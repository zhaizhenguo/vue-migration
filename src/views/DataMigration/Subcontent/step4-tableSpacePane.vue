<template>
  <el-table
    :data="tableData"
    border
    stripe
    :height="tableHeight"
    style="width: 100%"
    :highlight-current-row="true"
    @select-all="selectAll"
    @select="select"
    ref="table"
  >
    <el-table-column align="center" type="selection" min-width="1%">
    </el-table-column>
    <el-table-column align="center" type="index" label="行号" min-width="1%">
    </el-table-column>
    <el-table-column
      align="center"
      sortable
      prop="sourceName"
      label="源端名称"
      min-width="12%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      sortable
      prop="targetName"
      label="目的端名称"
      min-width="14%"
    >
      <template slot-scope="scope">
        <el-input size="mini" v-model="scope.row.targetName"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsInitSize"
      label="初始化大小(K)"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsNextSize"
      label="增长量(K)"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsMaxSize"
      label="最大值(K)"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsPctFree"
      label="空闲比"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsPctUsed"
      label="最小使用比"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsFill"
      label="索引填充"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsSplit"
      label="索引分裂"
      min-width="7%"
    >
    </el-table-column>
    <el-table-column
      align="center"
      prop="tsLogging"
      label="输出日志"
      min-width="7%"
    >
      <template slot-scope="scope">
        <el-select size="mini" v-model="scope.row.tsLogging">
          <el-option
            v-for="item in whetherList"
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
      prop="tsDataFiles"
      label="数据文件"
      min-width="14%"
      :formatter="dateFormat"
    >
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableHeight: {
      type: Number,
      default: function () {
        return 500;
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {},
  data() {
    return {
      whetherList: [
        { value: "true", label: "是" },
        { value: "false", label: "否" },
      ],
    };
  },
  methods: {
    selectRow(rows) {
      let tableRef = this.$refs.table;
      rows.forEach((row) => {
        tableRef.toggleRowSelection(row, true);
      });
    },
    selectAll(selection) {
      this.$emit("getSelectPaneData", "tableSpace", selection);
    },
    select(selection) {
      this.$emit("getSelectPaneData", "tableSpace", selection);
    },
    dateFormat(row, column) {
      if (!!row.tsDataFiles) {
        let resStr = "";
        row.tsDataFiles.forEach((item) => {
          resStr = resStr + item.dataFile + ",";
        });
        resStr = resStr.substring(0, resStr.length - 1);
        return resStr;
      }
      return null;
    },
  },
};
</script>
<style scoped>
</style>
