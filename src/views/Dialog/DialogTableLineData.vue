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
      @tab-click="tabHandleClick()"
      ><el-tab-pane
        v-for="(item, index) in tabResources"
        :label="item.label"
        :name="item.value"
        :key="index"
      >
        <step4LinePane
          v-if="item.value === 'line'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          ref="line"
        >
        </step4LinePane>
        <step4CommonPane
          v-else-if="item.value === 'majorKey'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="majorKey"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'constraint'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="constraint"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'onlyConstraint'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="onlyConstraint"
        ></step4CommonPane>

        <step4CommonPane
          v-else-if="item.value === 'index'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="index"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'trigger'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="trigger"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'fullIndex'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="fullIndex"
        ></step4CommonPane>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>
<script>
import step4LinePane from "../DataMigration/Subcontent/step4-dialogLinePane";
import step4CommonPane from "../DataMigration/Subcontent/step4-dialogCommonPane";
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
  components: {
    step4LinePane: step4LinePane,
    step4CommonPane: step4CommonPane,
  },
  data() {
    return {
      activeName: "line",
      tableHeight: 430,
      tabResources: [
        { value: "line", label: "列" },
        { value: "majorKey", label: "主键" },
        { value: "constraint", label: "约束" },
        { value: "onlyConstraint", label: "唯一约束" },
        { value: "index", label: "索引" },
        { value: "trigger", label: "触发器" },
        { value: "fullIndex", label: "全文索引" },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("closeTableLineDialog");
    },
    initData() {
      if (this.singleTableResourceData.isSelectAllLineRow) {
        this.$nextTick(() => {
          this.$refs[this.activeName][0].selectAllRow();
        });
      } else {
        this.$emit("setTableResourceData", this);
      }
    },
    handleEdit(index, row) {},
    getTableResourceData(key, value) {
      this.singleTableResourceData.isSelectAllLineRow = false;
      this.$emit("getTableResourceData", key, value, this.tableName);
    },
    tabHandleClick() {
      this.$emit("setTableResourceData", this);
    },
    selectRow(rows) {
      if (!rows) {
        return;
      }
      this.$nextTick(() => {
        this.$refs[this.activeName][0].selectRow(rows);
      });
    },
  },
  created() {
    this.initData();
  },
};
</script>
