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
      label="源对象名"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="targetLineName"
      label="目的对象名"
      min-width="10%"
    >
      <template slot-scope="scope">
        <el-input v-model="scope.row.targetLineName"></el-input>
      </template>
    </el-table-column>

    <el-table-column sortable prop="defaultValue" label="定义" min-width="70%">
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
        { value: "VARCHAR", label: "VARCHAR" },
        { value: "VARCHAR1", label: "VARCHAR1" },
        { value: "VARCHAR2", label: "VARCHAR2" },
      ],
      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      sourcePattern: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" },
      ],
      checkSourcePattern: "SYSDBA",
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
<style scoped>
</style>
