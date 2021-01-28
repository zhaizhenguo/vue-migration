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
      <el-table-column align="center" type="selection" min-width="2%">
      </el-table-column>
      <el-table-column align="center" type="index" label="行号" min-width="2%">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="sourceName"
        label="源列名"
        min-width="11%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="targetName"
        label="目的列名"
        min-width="15%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.targetName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="targetType"
        label="类型"
        min-width="14%"
      >
        <template slot-scope="scope">
          <el-select
            size="mini"
            v-if="!!scope.row.stype.accTypes"
            v-model="scope.row.targetType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in scope.row.stype.accTypes"
              :key="item.ttypeName"
              :label="item.ttypeName"
              :value="item.ttypeName"
            >
            </el-option>
          </el-select>
          <el-input v-else v-model="scope.row.targetType"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="lengthTarget"
        label="长度"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.lengthTarget"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="precisionTarget"
        label="精度"
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="scaleTarget"
        label="小数位"
        min-width="8%"
      >
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="isPrimaryKey"
        label="主键"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.isPrimaryKey">
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
        sortable
        prop="isNull"
        label="可为空"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-select size="mini" v-model="scope.row.isNull">
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
        sortable
        prop="defaultValueTarget"
        label="默认值"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.defaultValue"></el-input>
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
        { value: true, label: "是" },
        { value: false, label: "否" },
      ],
    };
  },
  methods: {
    selectAll(selection) {
      this.$emit("getTableResourceData", "columns", selection);
    },
    select(selection) {
      this.$emit("getTableResourceData", "columns", selection);
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
