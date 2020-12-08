<template>
  <div>
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
        prop="sourceLineName"
        label="源函数名"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetLineName"
        label="目的函数名"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetLineName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="checkType"
        label="函数定义"
        min-width="70%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.checkType"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
    return {};
  },
  methods: {
    getRowKey(row) {
      return row.primaryId;
    },
    selectRow(rows) {
      let tableRef = this.$refs.table;
      rows.forEach((row) => {
        tableRef.toggleRowSelection(row, true);
      });
    },
    selectAll(selection) {
      this.$emit("getSelectPaneData", "functionData", selection);
    },
    select(selection) {
      this.$emit("getSelectPaneData", "functionData", selection);
    },

    getData() {
      return {
        objData,
      };
    },
  },
  created: function () {},
  computed: {},
};
</script>
<style scoped>
</style>
