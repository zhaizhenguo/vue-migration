<template>
  <el-dialog
    title="设置属性"
    :visible.sync="dialogDriverDataVisible"
    :close-on-click-modal="false"
    @close="close"
    width="600px"
  >
    <!-- <el-container>
      <el-main style="padding：0">
        <el-row>
          <el-col :span="12">属性名</el-col>
          <el-col :span="12">属性值</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><el-input v-model="url"></el-input></el-col>
          <el-col :span="12"><el-input v-model="form"></el-input></el-col>
        </el-row>
      </el-main>
      <el-aside width="70px; text-align: center;">
        <el-row><el-button @click="addOrDelete(1)">添加</el-button></el-row>
        <el-row><el-button @click="addOrDelete(0)">删除</el-button></el-row>
        <el-row><el-button @click="submit">确定</el-button></el-row>
      </el-aside>
    </el-container> -->
    <el-container>
      <el-main style="padding：0">
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange"
          border
          height="300"
          style="width: 100%"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column align="center" label="属性名" prop="date">
            <template slot-scope="scope">
              <el-input v-model="scope.row.key"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="属性值" prop="name">
            <template slot-scope="scope">
              <el-input v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-aside style=" width:75px; text-align: center; padding-left: 5px">
        <el-row><el-button @click="addOrDelete(1)">添加</el-button></el-row>
        <el-row><el-button @click="addOrDelete(0)">删除</el-button></el-row>
        <el-row><el-button @click="submit">确定</el-button></el-row>
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
      default: function() {
        return false;
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  created() {},
  methods: {
    handleSelectionChange(val) {
      console.log("val===", val);
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
        this.tableData.push({ key: "", value: "" });
      } else {
        if (this.multipleSelection.length) {
          //   this.multipleSelection.forEach(function(item) {});
          this.multipleSelection.forEach(item => {
            let index = this.tableData.indexOf(item);
            if (index != -1) {
              this.tableData.splice(index, 1);
            }
          });
        }
      }
    },
    submit() {
      console.log("tableData===", this.tableData);
      this.$emit("getDriverData", this.tableData);
    }
  }
};
</script>
