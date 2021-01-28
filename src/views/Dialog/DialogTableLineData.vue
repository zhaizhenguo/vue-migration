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
          v-if="item.value === 'columns'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          ref="columns"
        >
        </step4LinePane>
        <step4CommonPane
          v-else-if="item.value === 'foreignKeys'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="foreignKeys"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'checkInfos'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="checkInfos"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'uniqueInfos'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="uniqueInfos"
        ></step4CommonPane>

        <step4CommonPane
          v-else-if="item.value === 'indexInfos'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="indexInfos"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'triggers'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="triggers"
        ></step4CommonPane>
        <step4CommonPane
          v-else-if="item.value === 'fullIndexInfos'"
          v-show="activeName === item.value"
          @getTableResourceData="getTableResourceData"
          :tableData="singleTableResourceData[item.value]"
          :tableHeight="tableHeight"
          :paneName="item.value"
          ref="fullIndexInfos"
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
      activeName: "columns",
      tableHeight: 430,
      tabResources: [
        { value: "columns", label: "列" },
        { value: "foreignKeys", label: "外键" },
        { value: "checkInfos", label: "约束" },
        { value: "uniqueInfos", label: "唯一约束" },
        { value: "indexInfos", label: "索引" },
        { value: "triggers", label: "触发器" },
        { value: "fullIndexInfos", label: "全文索引" },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("closeTableLineDialog");
    },
    initData() {
      if (!!this.singleTableResourceData.isSelectAllLineRow) {
        //解决接送数据重复值问题 例如:$.data.columns[1].stype
        this.singleTableResourceData["columns"].forEach((element) => {
          if (!!element.stype["$ref"]) {
            //获得索引
            let index = element.stype["$ref"].substring(15, 16);
            element["stype"] = this.singleTableResourceData["columns"][
              index
            ].stype;
          }
        });
        this.$nextTick(() => {
          //有数据的全部选中
          this.tabResources.forEach((element) => {
            let dataArray = this.singleTableResourceData[element.value];
            if (!!dataArray && dataArray.length > 0) {
              this.$refs[element.value][0].selectAllRow();
            }
          });
        });
      } else {
        this.$emit("setTableResourceData", this);
      }
    },
    handleEdit(index, row) {},
    getTableResourceData(key, value) {
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
