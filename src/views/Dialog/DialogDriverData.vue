<template>
  <el-dialog
    title="设置属性"
    :visible="dialogDriverDataVisible"
    :close-on-click-modal="false"
    @close="close"
    width="600px"
  >
    <el-container>
      <el-main style="padding: 0px">
        <el-form :model="formTableData" ref="formTableData">
          <el-table
            :data="formTableData.tableData"
            @selection-change="handleSelectionChange"
            border
            :stripe="true"
            :highlight-current-row="true"
            height="300"
            style="width: 100%"
          >
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column align="center" label="属性名" prop="">
              <template slot-scope="{ row, $index }">
                <el-form-item
                  style="margin-bottom: 0"
                  :inline-message="true"
                  label=""
                  :prop="`tableData.${$index}.attributeName`"
                  :rules="rules.attributeName"
                >
                  <el-input v-model="row.attributeName"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column align="center" label="属性值" prop="">
              <template slot-scope="{ row, $index }">
                <el-form-item
                  :inline-message="true"
                  style="margin-bottom: 0"
                  label=""
                  :prop="`tableData.${$index}.attributeValue`"
                  :rules="rules.attributeValue"
                >
                  <el-input v-model="row.attributeValue"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-main>
      <el-aside style="width: 75px; text-align: center; padding-left: 5px">
        <el-row style="height: 40px"
          ><el-button type="primary" plain @click="addOrDelete(1)"
            >添加</el-button
          ></el-row
        >
        <el-row style="height: 40px"
          ><el-button type="primary" plain @click="addOrDelete(0)"
            >删除</el-button
          ></el-row
        >
        <el-row
          ><el-button type="primary" plain @click="submit"
            >确定</el-button
          ></el-row
        >
      </el-aside>
    </el-container>

    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogDriverDataVisible: {
      type: Boolean,
      default: function () {
        return false;
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
      multipleSelection: [],
      rules: {
        attributeName: [
          {
            required: true,
            message: "请输入属性名",
            trigger: "change",
          },
        ],
        attributeValue: [
          {
            required: true,
            message: "请输入属性值",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    close() {
      this.$emit("closeDriverData");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    addOrDelete(isAdd) {
      if (isAdd) {
        this.tableData.push({ attributeName: "", attributeValue: "" });
      } else {
        if (this.multipleSelection.length) {
          this.multipleSelection.forEach((item) => {
            let index = this.tableData.indexOf(item);
            if (index != -1) {
              this.tableData.splice(index, 1);
            }
          });
        } else {
          this.$message.error("请勾选要删除的列");
        }
      }
    },
    submit() {
      let param;
      this.$refs.formTableData.validate((valid) => {
        if (valid) {
          param = true;
        } else {
          param = false;
        }
      });
      if (!param) {
        return;
      }
      this.$emit("getDriverData", this.tableData);
    },
  },
  computed: {
    formTableData() {
      return { tableData: this.tableData };
    },
  },
};
</script>
