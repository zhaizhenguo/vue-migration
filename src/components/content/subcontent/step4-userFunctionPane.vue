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
        label="源自定义名"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetLineName"
        label="目的自定义名"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetLineName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="checkType"
        label="自定义定义"
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
import objData from "../../constant/step5Tab";
import objData02 from "../../constant/step5Tab02";
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
      objData: objData,
      objData02: objData02,
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
      this.$emit("getSelectPaneData", "userFunction", selection);
    },
    select(selection) {
      this.$emit("getSelectPaneData", "userFunction", selection);
    },
    handleSelectionChange(val) {
      if (val === "ZG") {
        this.objData = JSON.parse(
          JSON.stringify(this.$options.data().objData02)
        );
      } else {
        this.objData = JSON.parse(JSON.stringify(this.$options.data().objData));
      }
      console.log("val===", val);
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
