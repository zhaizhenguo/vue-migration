<template>
  <el-container>
    <el-main style="padding-bottom: 0px">
      <tableForm
        ref="topTableForm"
        :tableData="colMapRelation"
        :tableHeight="tableHeight"
      ></tableForm>
    </el-main>
    <el-footer style="height: 180px">
      <tableForm
        ref="bottomTableForm"
        :tableData="colMapRelationTemp"
        :tableHeight="bottomTableHeight"
        :isShowHeader="false"
        :firstColumnIsText="false"
        :emptyText="bottomTableEmptyText"
      ></tableForm>
      <el-button
        type="primary"
        plain
        style="float: right; margin-left: 10px"
        @click="btnclickReset()"
        >重置</el-button
      >
      <el-button
        type="primary"
        plain
        style="float: right"
        @click="addOrDelete(0)"
        >删除行</el-button
      ><el-button
        type="primary"
        plain
        style="float: right"
        @click="addOrDelete(1)"
        >添加行</el-button
      >
    </el-footer>
  </el-container>
</template>
<script>
// import colMapRelation from "@/components/Constant/step3colMapRelation";
import tableForm from "./Subcontent/step3-tableForm";
import api from "@/components/Asset/Api";
export default {
  components: {
    tableForm: tableForm,
  },
  data() {
    return {
      colMapRelation: null,
      backColMapRelation: null,
      colMapRelationTemp: [],
      tableHeight: 400,
      bottomTableHeight: 150,
      bottomTableEmptyText: "请添加自定义映射列",
    };
  },
  methods: {
    initData(sourceData) {
      this.getTypeMapping();
      this.$refs.bottomTableForm.calcHeightx();
      this.$refs.topTableForm.calcHeightx();
    },
    getData() {
      if (!this.$refs.bottomTableForm.getValidate()) {
        return;
      }
      this.calResultData();
      console.log("colMapRelation====", this.colMapRelation);
      return { colMapRelation: this.colMapRelation };
    },
    //封装自定义的列映射
    calResultData() {
      this.colMapRelationTemp.forEach((item) => {
        this.colMapRelation.push(item);
      });
    },
    addOrDelete(isAdd) {
      if (isAdd) {
        this.colMapRelationTemp.push({
          sname: "",
          sExpression: "",
          pExpression: "",
          lExpression: "",
          targetFieldType: "",
          targetPExpression: "",
          targetSExpression: "",
          targetLExpression: "",
        });
      } else {
        let selectTableData = this.$refs.bottomTableForm.selectTableData;
        if (selectTableData.length) {
          selectTableData.forEach((item) => {
            let index = this.colMapRelationTemp.indexOf(item);
            if (index != -1) {
              this.colMapRelationTemp.splice(index, 1);
            }
          });
        } else {
          this.$message.error("请勾选要删除的自定义映射列");
        }
      }
    },
    btnclickReset() {
      this.$confirm("此操作将删除您的自定义映射列, 是否继续?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.colMapRelation = JSON.parse(
            JSON.stringify(this.backColMapRelation)
          );
          this.colMapRelationTemp = [];
          this.$message("内容已重置");
        })
        .catch(() => {});
    },
    getTypeMapping() {
      api.dataMigration.getTypeMapping(null, (response) => {
        let res = response.data;
        if (res.code == 0) {
          this.colMapRelation = res.data;
          //备份原始数据
          this.backColMapRelation = JSON.parse(
            JSON.stringify(this.colMapRelation)
          );
          this.$message({
            message: "查询成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "查询失败, " + res.msg,
            type: "error",
          });
        }
      });
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
};
</script>
<style scoped></style>
