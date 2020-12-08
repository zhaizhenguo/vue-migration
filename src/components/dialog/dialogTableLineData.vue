<template>
  <el-dialog
    title="设置"
    :visible="dialogTableLineDataVisible"
    :close-on-click-modal="false"
    @close="close()"
    width="1200px"
  >
    <el-tabs
      style="height: 500px"
      type="border-card"
      v-model="activeName"
      @tab-click="tabHandleClick"
      ><el-tab-pane
        v-for="(item, index) in tabResources"
        :label="item.label"
        :name="item.value"
        :key="index"
      >
        <step4LinePane
          v-show="activeName === 'line'"
          @getTableResourceData="getTableResourceData"
          :lineData="singleTableResourceData['line']"
          :ref="item"
        >
        </step4LinePane>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer" style="margin: -30px 20px">
      <el-button type="primary" @click="submit()">确 定</el-button>
      <el-button @click="close()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import step4LinePane from "../content/subcontent/step4-dialogLinePane";

export default {
  props: {
    dialogTableLineDataVisible: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    singleTableResourceData: {
      type: Object,
      default: function () {
        return [];
      },
    },
    tableName: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  components: { step4LinePane: step4LinePane },
  data() {
    return {
      activeName: "line",
      tabResources: [
        { value: "line", label: "列" },
        { value: "majorKey", label: "主键" },
        { value: "constraint", label: "约束" },
        { value: "onlyConstraint", label: "唯一约束" },
        { value: "index", label: "索引" },
        { value: "ttrigger", label: "触发器" },
        { value: "fullIndex", label: "全文索引" },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("closeTableLineDialog");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    getTableResourceData(key, value) {
      this.$emit("getTableResourceData", key, value, this.tableName);
    },
    tabHandleClick() {},
  },
};
</script>
