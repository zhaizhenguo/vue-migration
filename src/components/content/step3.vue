<template>
  <el-container>
    <el-main style="padding-bottom: 0px"
      ><el-table
        :data="colMapRelation"
        border
        stripe
        :height="tableHeight"
        style="width: 100%"
      >
        <el-table-column type="selection" min-width="2%"> </el-table-column>
        <el-table-column
          prop="sourceFieldType"
          label="源数据类型"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column prop="sourcePrecision" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column prop="sourceDecimal" label="小数点" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="sourceFieldLength"
          label="数据长度"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          prop="targetFieldType"
          label="目标数据类型"
          min-width="10%"
        >
          <template slot-scope="scope">
            <el-select
              v-if="typeof scope.row.targetFieldType === 'object'"
              v-model="scope.row.checkTargetFieldType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in scope.row.targetFieldType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input v-model="scope.row.targetFieldType" v-else></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="targetPrecision" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column prop="targetDecimal" label="小数点" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="targetFieldLength"
          label="数据长度倍数"
          min-width="10%"
        >
        </el-table-column> </el-table
    ></el-main>
    <el-footer style="height: 140px">
      <el-table
        @selection-change="handleSelectionChange"
        :data="colMapRelationTemp"
        border
        stripe
        :show-header="false"
        :height="100"
        style="width: 100%"
      >
        <el-table-column type="selection" min-width="2%"> </el-table-column>

        <el-table-column
          prop="sourceFieldType"
          label="源数据类型"
          min-width="10%"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.sourceFieldType"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="sourcePrecision" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column prop="sourceDecimal" label="小数点" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="sourceFieldLength"
          label="数据长度"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          prop="checkTargetFieldType"
          label="目标数据类型"
          min-width="10%"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.checkTargetFieldType"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="targetPrecision" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column prop="targetDecimal" label="小数点" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="targetFieldLength"
          label="数据长度倍数"
          min-width="10%"
        >
        </el-table-column>
      </el-table>
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
import colMapRelation from "../constant/step3colMapRelation";
export default {
  data() {
    return {
      colMapRelation: colMapRelation,
      backColMapRelation: null,
      colMapRelationTemp: [],
      multipleSelection: [],
      tableHeight: 450
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      return {
        colMapRelation
      };
    },
    calResultData() {
      this.colMapRelationTemp.forEach(item => {
        this.colMapRelation.push(item);
      });
    },
    addOrDelete(isAdd) {
      if (isAdd) {
        this.colMapRelationTemp.push({
          sourceFieldType: "",
          sourcePrecision: "",
          sourceDecimal: "",
          sourceFieldLength: "",
          checkTargetFieldType: "",
          targetPrecision: "",
          targetDecimal: "",
          targetFieldLength: ""
        });
      } else {
        if (this.multipleSelection.length) {
          //   this.multipleSelection.forEach(function(item) {});
          this.multipleSelection.forEach(item => {
            let index = this.colMapRelationTemp.indexOf(item);
            if (index != -1) {
              this.colMapRelationTemp.splice(index, 1);
            }
          });
        }
      }
    },
    btnclickReset() {
      this.colMapRelation = JSON.parse(JSON.stringify(this.backColMapRelation));
      this.colMapRelationTemp = [];
      this.colMapRelationTemp = [];
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
    this.backColMapRelation = JSON.parse(JSON.stringify(this.colMapRelation));
    this.calcHeightx();
  }
};
</script>
<style scoped></style>
