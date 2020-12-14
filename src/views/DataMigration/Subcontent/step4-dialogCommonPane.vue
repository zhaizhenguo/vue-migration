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
    <el-table-column type="selection" min-width="2%"> </el-table-column>
    <el-table-column type="index" label="行号" min-width="2%">
    </el-table-column>
    <el-table-column
      sortable
      prop="sourceObjectName"
      label="源对象名"
      min-width="12%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="targetObjectName"
      label="目的对象名"
      min-width="15%"
    >
      <template slot-scope="scope">
        <el-input v-model="scope.row.targetObjectName"></el-input>
      </template>
    </el-table-column>

    <el-table-column sortable prop="definition" label="定义" min-width="69%">
      <template slot-scope="scope">
        <el-input v-model="scope.row.definition"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    paneName: {
      type: String,
      default: function () {
        return "";
      },
    },
    tableHeight: {
      type: Number,
      default: function () {
        return 430;
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods: {
    selectAll(selection) {
      this.$emit("getTableResourceData", this.paneName, selection);
    },
    select(selection) {
      this.$emit("getTableResourceData", this.paneName, selection);
    },
    selectRow(rows) {
      let tableRef = this.$refs["table"];
      rows.forEach((row) => {
        tableRef.toggleRowSelection(row, true);
      });
    },
    selectAllRow() {
      this.$refs["table"].toggleAllSelection();
    },
  },
};
</script>
<style scoped>
</style>
