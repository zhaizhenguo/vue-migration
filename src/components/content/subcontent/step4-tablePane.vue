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
      prop="sourceTableName"
      label="源表名"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="targetTableName"
      label="目标表名"
      min-width="10%"
    >
      <template slot-scope="scope">
        <el-input v-model="scope.row.targetTableName"></el-input>
      </template>
    </el-table-column>
    <el-table-column
      sortable
      prop="checkOperatingMode"
      label="操作方式"
      min-width="10%"
    >
      <template slot-scope="scope">
        <el-select v-model="scope.row.checkOperatingMode" placeholder="请选择">
          <el-option
            v-for="item in operatingMode"
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
      prop="checkTableSpace"
      label="表空间"
      min-width="10%"
    >
      <template slot-scope="scope">
        <el-select v-model="scope.row.checkTableSpace" placeholder="请选择">
          <el-option
            v-for="item in tableSpace"
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
      prop="initSize"
      label="初始大小(K)"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="incrementSize"
      label="增长量(K)"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column sortable prop="maxSize" label="最大值" min-width="10%">
    </el-table-column>
    <el-table-column sortable prop="freeRatio" label="空闲比" min-width="10%">
    </el-table-column>
    <el-table-column
      sortable
      prop="minUseRatio"
      label="最小使用比"
      min-width="10%"
    >
    </el-table-column>
    <el-table-column
      sortable
      prop="checkOutputLog"
      label="输出日志"
      min-width="10%"
      ><template slot-scope="scope">
        <el-select v-model="scope.row.checkOutputLog" placeholder="请选择">
          <el-option
            v-for="item in outputLog"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column sortable prop="filter" label="过滤" min-width="10%">
      <template slot-scope="scope">
        <el-input v-model="scope.row.filter"></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import objData from "../../constant/step4Tab";
import objData02 from "../../constant/step4Tab02";
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
      isOpenSwitch: false,
      dialogSQLDataVisible: false,
      operatingMode: [
        { value: "newTable", label: "新建表" },
        { value: "heavyLoadData", label: "重载数据" },
        { value: "addToData", label: "追加数据" },
      ],
      tableSpace: [
        { value: "SYSTEM", label: "SYSTEM" },
        { value: "UNDOTS01", label: "UNDOTS01" },
        { value: "TEMP", label: "TEMP" },
        { value: "AUDIT", label: "AUDIT" },
      ],
      outputLog: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],

      sourcePattern: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" },
      ],
      checkSourcePattern: "SYSDBA",
      //   this.sourcePattern[0].value,
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
    btnPointSQL() {
      this.dialogSQLDataVisible = true;
    },
    closePointSQL() {
      this.dialogSQLDataVisible = false;
    },
    getSqlData(data) {
      console.log("parent==========", data);
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
.qzqy {
  padding-left: 50px;
  line-height: 32px;
  width: auto;
}
.btnCom {
  width: 120px;
  margin-left: 20px;
}
</style>
