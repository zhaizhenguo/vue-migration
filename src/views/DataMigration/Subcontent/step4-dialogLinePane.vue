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
        label="源列名"
        min-width="11%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetLineName"
        label="目的列名"
        min-width="15%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetLineName"></el-input>
        </template>
      </el-table-column>
      <el-table-column sortable prop="checkType" label="类型" min-width="14%">
        <template slot-scope="scope">
          <el-select
            v-if="typeof scope.row.type === 'object'"
            v-model="scope.row.checkType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in scope.row.type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input v-else v-model="scope.row.checkType"></el-input>
        </template>
      </el-table-column>
      <el-table-column sortable prop="length" label="长度" min-width="10%">
        <template slot-scope="scope">
          <el-input v-model="scope.row.length"></el-input>
        </template>
      </el-table-column>
      <el-table-column sortable prop="precision" label="精度" min-width="8%">
      </el-table-column>
      <el-table-column sortable prop="decimals" label="小数位" min-width="8%">
      </el-table-column>
      <el-table-column sortable prop="ismajorKey" label="主键" min-width="10%">
        <template slot-scope="scope">
          <el-select v-model="scope.row.ismajorKey">
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
      <el-table-column sortable prop="canBeNull" label="可为空" min-width="10%">
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
      <el-table-column
        sortable
        prop="defaultValue"
        label="默认值"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.defaultValue"></el-input>
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
  },
  data() {
    return {
      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
    };
  },
  methods: {
    selectAll(selection) {
      this.$emit("getTableResourceData", "line", selection);
    },
    select(selection) {
      this.$emit("getTableResourceData", "line", selection);
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
<style scoped></style>
