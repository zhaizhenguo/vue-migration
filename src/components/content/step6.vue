<template>
  <div>
    <el-container>
      <el-header>
        <el-row
          ><el-col :span="3"
            >表
            <el-select
              style="width: 130px"
              @change="handleSelectionChange"
              v-model="checkSourcePattern"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sourcePattern"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4"
            >对象类型
            <el-select
              style="width: 130px"
              @change="handleSelectionChange"
              v-model="checkObjType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in objTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row> </el-row>
      </el-header>
      <el-main style="padding: 0px 20px">
        <step6TablePane ref="step6TablePane"></step6TablePane>
      </el-main>
      <el-footer> </el-footer>
    </el-container>
  </div>
</template>
<script>
import objData from "../constant/step5Tab";
import objData02 from "../constant/step5Tab02";
import step6TablePane from "./subcontent/step6-tablePane";
export default {
  components: {
    step6TablePane: step6TablePane,
  },
  data() {
    return {
      objData: objData,
      objData02: objData02,
      tableHeight: 570,
      objTypeList: [
        { value: "majorKey", label: "主键" },
        { value: "constraint", label: "约束" },
        { value: "onlyConstraint", label: "唯一约束" },
        { value: "index", label: "索引" },
        { value: "ttrigger", label: "触发器" },
        { value: "fullIndex", label: "全文索引" },
      ],
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
      checkObjType: "majorKey",
    };
  },
  methods: {
    initData(sourceData) {},
    handleSelectionChange(val) {
      if (Math.round(Math.random()) === 0) {
        this.$refs["step6TablePane"].objData = JSON.parse(
          JSON.stringify(this.$refs["step6TablePane"].$options.data().objData02)
        );
      } else {
        this.$refs["step6TablePane"].objData = JSON.parse(
          JSON.stringify(this.$refs["step6TablePane"].$options.data().objData)
        );
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
