<template>
  <div>
    <el-container>
      <el-header>
        <el-row
          ><el-col :span="24"
            >目的表
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
        </el-row>
        <el-row> </el-row>
      </el-header>
      <el-main style="padding: 0px 20px">
        <step5TablePane
          @getPaneData="getPaneData"
          ref="step5TablePane"
        ></step5TablePane>
      </el-main>
      <el-fotter> </el-fotter>
    </el-container>
  </div>
</template>
<script>
import objData from "../constant/step5Tab";
import objData02 from "../constant/step5Tab02";
import step5TablePane from "./subcontent/step5-tablePane";
export default {
  components: {
    step5TablePane: step5TablePane,
  },
  data() {
    return {
      objData: objData,
      objData02: objData02,
      tabLineData: {},
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
    getPaneData(key, value) {
      this.tabLineData[key] = value;
      console.log("this.tabLineData====", this.tabLineData);
    },
    handleSelectionChange(val) {
      if (val === "ZG") {
        this.$refs["step5TablePane"].objData = JSON.parse(
          JSON.stringify(this.$refs["step5TablePane"].$options.data().objData02)
        );
      } else {
        this.$refs["step5TablePane"].objData = JSON.parse(
          JSON.stringify(this.$refs["step5TablePane"].$options.data().objData)
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
