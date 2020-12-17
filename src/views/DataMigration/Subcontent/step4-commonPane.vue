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
      <el-table-column align="center" type="selection" min-width="1%">
      </el-table-column>
      <el-table-column align="center" type="index" label="行号" min-width="1%">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="sourceName"
        :label="headerData.sourceName"
        min-width="15%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="targetName"
        :label="headerData.targetName"
        min-width="18%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.targetName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="definition"
        :label="headerData.definition"
        min-width="65%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.definition"></el-input>
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
        return [];
      },
    },
    headerData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    paneName: {
      type: String,
      default: function () {
        return "";
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
      this.$emit("getSelectPaneData", this.paneName, selection);
    },
    select(selection) {
      this.$emit("getSelectPaneData", this.paneName, selection);
    },
    getData() {
      return {};
    },
  },
  created: function () {},
  computed: {},
};
</script>
<style scoped></style>
