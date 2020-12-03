<template>
  <div>
    <el-table
      :data="objData"
      border
      stripe
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column type="selection" min-width="2%"> </el-table-column>
      <el-table-column type="index" label="行号" min-width="2%">
      </el-table-column>
      <el-table-column
        sortable
        prop="sourceLineName"
        label="源序列名"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetLineName"
        label="目的序列名"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetLineName"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="checkType"
        label="序列定义"
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
  },
  components: {},
  data() {
    return {
      objData: objData,
      objData02: objData02,
    };
  },
  methods: {
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
