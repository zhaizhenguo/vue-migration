<template>
  <el-table
    :data="objData"
    border
    stripe
    :height="tableHeight"
    style="width: 100%"
    :highlight-current-row="true"
    @select-all="selectAll"
    @select="select"
    :row-key="getRowKey"
    ref="table"
  >
    <el-table-column type="selection" reserve-selection="true" min-width="2%">
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
        <el-select v-model="scope.row.checkType" placeholder="请选择">
          <el-option
            v-for="item in lineTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
</template>
<script>
import objData from "../../constant/step5Tab";
import objData02 from "../../constant/step5Tab02";
export default {
  components: {},
  data() {
    return {
      objData: objData,
      objData02: objData02,
      tableHeight: 550,
      lineTypeList: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" }
      ],
      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" }
      ],
      sourcePattern: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" }
      ],
      checkSourcePattern: "SYSDBA"
    };
  },
  methods: {
    getRowKey(row) {
      console.log("row.sourceLineName============", row.sourceLineName);
      return row.sourceLineName;
    },
    selectRow(rows) {
      let tableRef = this.$refs.table;
      rows.forEach(row => {
        tableRef.toggleRowSelection(row, true);
      });
    },
    selectAll(selection) {
      this.$emit("getPaneData", "step4TablePane", selection);
    },
    select(selection) {
      console.log("selection=====", selection);
      this.$emit("getPaneData", "step4TablePane", selection);
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
        objData
      };
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
    }
  },
  created: function() {
    this.calcHeightx();
  },
  computed: {}
};
</script>
<style scoped></style>
