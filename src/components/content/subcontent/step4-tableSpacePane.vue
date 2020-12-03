<template>
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
      label="表空间"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="targetLineName"
      label="目的端名称"
      min-width="10%"
    >
      <template slot-scope="scope">
        <el-input v-model="scope.row.targetLineName"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="checkType"
      label="初始化大小(K)"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column sortable prop="length" label="增长量(K)" min-width="10%">
    </el-table-column>
    <el-table-column sortable prop="precision" label="空闲比" min-width="10%">
    </el-table-column>
    <el-table-column
      sortable
      prop="decimals"
      label="最小使用比"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="ismajorKey"
      label="索引填充"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column sortable prop="canBeNull" label="索引分裂" min-width="10%">
    </el-table-column>
    <el-table-column
      sortable
      prop="checkOutputLog"
      label="输出日志"
      min-width="10%"
    >
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
    <el-table-column sortable prop="filter" label="数据文件" min-width="10%">
    </el-table-column>
  </el-table>
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

      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
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
