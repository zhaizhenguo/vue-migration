<template>
  <el-dialog
    title="参数配置"
    :visible.sync="dialogParamConfigVisible"
    :close-on-click-modal="false"
    @close="close"
    width="1370px"
  >
    <step-2 ref="step2"></step-2>
    <div slot="footer" class="dialog-footer" style="margin: -30px 20px">
      <el-button type="primary" @click="submit()">确 定</el-button>
      <el-button @click="dialogParamConfigVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import step2 from "../DataMigration/Step2";
export default {
  components: {
    step2: step2,
  },
  props: {
    dialogParamConfigVisible: {
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
      this.$emit("getSqlData", this.getParam());
    },
    getParam() {
      return { sqlName: this.sqlName, sqlTextarea: this.sqlTextarea };
    },
    close() {
      this.$emit("closeParamConfig");
    },
  },
};
</script>
