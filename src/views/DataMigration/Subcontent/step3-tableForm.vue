<template>
  <div>
    <el-form :model="formTableData" ref="formTableData">
      <el-table
        @selection-change="handleSelectionChange"
        :data="formTableData.tableData"
        border
        stripe
        :highlight-current-row="true"
        :height="tableHeight"
        :show-header="isShowHeader"
        :emptyText="emptyText"
        style="width: 100%"
      >
        <el-table-column type="selection" min-width="2%"> </el-table-column>
        <el-table-column
          v-if="firstColumnIsText"
          prop="sname"
          label="源数据类型"
          min-width="19%"
        >
        </el-table-column>
        <el-table-column v-else prop="sname" label="源数据类型" min-width="19%">
          <template slot-scope="{ row, $index }">
            <el-form-item
              style="margin-bottom: 0"
              :inline-message="true"
              label=""
              :prop="`tableData.${$index}.sname`"
              :rules="rules.sname"
            >
              <el-input v-model="row.sname"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="pExpression" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column prop="sExpression" label="小数点" min-width="10%">
        </el-table-column>
        <el-table-column prop="lExpression" label="数据长度" min-width="10%">
        </el-table-column>
        <el-table-column prop="accTypes" label="目标数据类型" min-width="19%">
          <template slot-scope="{ row, $index }">
            <el-form-item
              style="margin-bottom: 0"
              :inline-message="true"
              label=""
              :prop="`tableData.${$index}.accTypes`"
              :rules="rules.accTypes"
            >
              <el-select
                v-if="typeof row.accTypes === 'object'"
                v-model="row.targetFieldType"
              >
                <el-option
                  v-for="item in row.accTypes"
                  :key="item.id"
                  :label="item.ttypeName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-input v-model="row.accTypes" v-else></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="targetPExpression" label="精度" min-width="10%">
        </el-table-column>
        <el-table-column
          prop="targetSExpression"
          label="小数点"
          min-width="10%"
        >
        </el-table-column>
        <el-table-column
          prop="targetLExpression"
          label="数据长度倍数"
          min-width="10%"
        >
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    emptyText: {
      type: String,
      default: function () {
        return "暂无数据";
      },
    },
    isShowHeader: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    firstColumnIsText: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    tableHeight: {
      type: Number,
      default: function () {
        return 200;
      },
    },
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      selectTableData: [],
      rules: {
        sname: [
          {
            required: true,
            message: "请输入源数据类型",
            trigger: "change",
          },
        ],
        accTypes: [
          {
            required: true,
            message: "请输入目标数据类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    getValidate() {
      let param;
      this.$refs.formTableData.validate((valid) => {
        if (valid) {
          param = true;
        } else {
          param = false;
        }
      });
      return param;
    },
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    calcHeightx() {
      let wapper = window.document.getElementsByClassName(
        "el-table__body-wrapper"
      );
      setTimeout(() => {
        wapper[0].style.height = this.tableHeight - 42 + "px";
      }, 100);
    },
  },
  created: function () {},
  computed: {
    formTableData() {
      return { tableData: this.tableData };
    },
  },
};
</script>
<style scoped></style>
