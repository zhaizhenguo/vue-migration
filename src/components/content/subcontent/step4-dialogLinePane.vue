<template>
  <div>
    <el-table
      :data="lineData"
      border
      stripe
      :height="330"
      style="width: 100%"
      :highlight-current-row="true"
      @cell-dblclick="celldbClick"
      @select-all="selectAll"
      @select="select"
      row-key="getRowKey"
      ref="table"
    >
      <el-table-column
        :reserve-selection="true"
        type="selection"
        min-width="2%"
      >
      </el-table-column>
      <el-table-column type="index" label="行号" min-width="2%">
      </el-table-column>
      <el-table-column
        sortable
        prop="sourceLineName"
        label="源列名"
        min-width="10%"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="targetLineName"
        label="目的列名"
        min-width="10%"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.targetLineName"></el-input>
        </template>
      </el-table-column>
      <el-table-column sortable prop="checkType" label="类型" min-width="10%">
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
      <el-table-column sortable prop="precision" label="精度" min-width="10%">
      </el-table-column>
      <el-table-column sortable prop="decimals" label="小数位" min-width="10%">
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
    lineData: {
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
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
    };
  },
  methods: {
    initData() {},
    getRowKey(row) {
      return row.sourceLineName;
    },
    selectAll(selection) {
      this.$emit("getTableResourceData", "line", selection);
    },
    select(selection) {
      console.log("selection=====", selection);
      this.$emit("getTableResourceData", "line", selection);
    },
    getData() {
      return {};
    },
    calcHeightx() {
      let wapper = window.document.getElementsByClassName(
        "el-table__body-wrapper"
      );
      //必须加延时，要不然赋不上去值
      setTimeout(() => {
        //通过上边计算得到的table高度的value值，减去table表格的header高度，剩下的通过dom节点直接强行赋给table表格的body
        wapper[0].style.height = this.tableHeight + "px";
      }, 100);
    },
  },
  created: function () {
    this.calcHeightx();
  },
  computed: {},
};
</script>
<style scoped></style>
