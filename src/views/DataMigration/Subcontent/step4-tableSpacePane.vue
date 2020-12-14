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
    <el-table-column type="selection" min-width="1%"> </el-table-column>
    <el-table-column type="index" label="行号" min-width="1%">
    </el-table-column>
    <el-table-column
      sortable
      prop="sourceLineName"
      label="表空间"
      min-width="12%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="targetLineName"
      label="目的端名称"
      min-width="14%"
    >
      <template slot-scope="scope">
        <el-input v-model="scope.row.targetLineName"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="checkType" label="初始化大小(K)" min-width="10%">
    </el-table-column>
    <el-table-column prop="length" label="增长量(K)" min-width="8%">
    </el-table-column>
    <el-table-column prop="precision" label="空闲比" min-width="8%">
    </el-table-column>
    <el-table-column prop="decimals" label="最小使用比" min-width="8%">
    </el-table-column>
    <el-table-column prop="ismajorKey" label="索引填充" min-width="8%">
    </el-table-column>
    <el-table-column prop="canBeNull" label="索引分裂" min-width="8%">
    </el-table-column>
    <el-table-column prop="checkOutputLog" label="输出日志" min-width="8%">
      <template slot-scope="scope">
        <el-select v-model="scope.row.canBeNull">
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
    <el-table-column prop="filter" label="数据文件" min-width="14%">
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
        return {};
      },
    },
  },
  components: {},
  data() {
    return {
      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
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
  },
};
</script>
<style scoped>
</style>
