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
          prop="sourceFieldType"
          label="源数据类型"
          min-width="19%"
        >
        </el-table-column>
        <el-table-column
          v-else
          prop="sourceFieldType"
          label="源数据类型"
          min-width="19%"
        >
          <template slot-scope="{ row, $index }">
            <el-form-item
              style="margin-bottom: 0"
              :inline-message="true"
              label=""
              :prop="`tableData.${$index}.sourceFieldType`"
              :rules="rules.sourceFieldType"
            >
              <el-input v-model="row.sourceFieldType"></el-input>
            </el-form-item>
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
          prop="targetFieldType"
          label="目标数据类型"
          min-width="19%"
        >
          <template slot-scope="{ row, $index }">
            <el-form-item
              style="margin-bottom: 0"
              :inline-message="true"
              label=""
              :prop="`tableData.${$index}.targetFieldType`"
              :rules="rules.targetFieldType"
            >
              <el-select
                v-if="typeof row.targetFieldType === 'object'"
                v-model="row.checkTargetFieldType"
              >
                <el-option
                  v-for="item in row.targetFieldType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input v-model="row.targetFieldType" v-else></el-input>
            </el-form-item>
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
        sourceFieldType: [
          {
            required: true,
            message: "请输入源数据类型",
            trigger: "change",
          },
        ],
        targetFieldType: [
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
