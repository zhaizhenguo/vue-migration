<template>
  <el-dialog
    title="SQL查询编译器"
    :visible.sync="dialogSQLDataVisible"
    :close-on-click-modal="false"
    @close="close"
    width="600px"
  >
    <el-container>
      <el-header style="height: auto">
        <el-row>
          <el-col :span="11"
            ><el-input v-model="sqlName" placeholder="请输入"></el-input
          ></el-col>
          <el-col :span="3" style="margin-left: 5px"
            ><el-button type="primary" :loading="false"
              >查 询</el-button
            ></el-col
          ><el-col :span="4">
            <el-button type="primary" @click="dialogFormVisible = false"
              >导 入</el-button
            ></el-col
          >
        </el-row></el-header
      >
      <el-main
        ><el-input
          type="textarea"
          :rows="7"
          placeholder="请输入内容"
          v-model="sqlTextarea"
        >
        </el-input>
      </el-main>
    </el-container>
    <div slot="footer" class="dialog-footer" style="margin: -30px 20px">
      <el-button type="primary" @click="dialogFormVisible = false"
        >分 析</el-button
      >
      <el-button type="primary" @click="submit()">确 定</el-button>
      <el-button @click="dialogSQLDataVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogSQLDataVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      sqlName: "",
      sqlTextarea: "",
    };
  },
  created() {},
  methods: {
    submit() {
      if (!this.sqlName.trim()) {
        this.$message.error("请输入查询名称");
        return;
      } else if (!this.sqlTextarea.trim()) {
        this.$message.error("请输入查询语句");
        return;
      }
      console.log("tableData===", this.getParam());
      this.$emit("getSqlData", this.getParam());
    },
    getParam() {
      return { sqlName: this.sqlName, sqlTextarea: this.sqlTextarea };
    },
    close() {
      this.$emit("closePointSQL");
    },
  },
};
</script>
