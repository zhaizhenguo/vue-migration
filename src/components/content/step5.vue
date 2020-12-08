<template>
  <div>
    <el-tabs
      v-model="activePattern"
      @tab-click="handleClick"
      type="border-card"
    >
      <el-tab-pane
        v-for="pattern in patternList"
        :key="pattern"
        :label="pattern"
        :name="pattern"
      >
        <step5TablePane
          :selectModleData="selectModleData[pattern]"
          @getSelectPaneData="getSelectPaneData"
          :ref="pattern"
        >
        </step5TablePane>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activePattern: "",
      selectModleData: {},

      patternList: [],
      tabLineData: {},
      lineTypeList: [
        { value: "VARCHAR", label: "VARCHAR" },
        { value: "VARCHAR1", label: "VARCHAR1" },
        { value: "VARCHAR2", label: "VARCHAR2" },
      ],
      whetherList: [
        { value: 0, label: "是" },
        { value: 1, label: "否" },
      ],
      sourcePattern: [
        { value: "SYSDBA", label: "SYSDBA" },
        { value: "ZG", label: "ZG" },
      ],
      checkSourcePattern: "SYSDBA",
    };
  },
  methods: {
    initData(stepData) {
      console.log("initData  this.stepData====", stepData);
      if (
        !!stepData &&
        !!stepData.step4 &&
        !!stepData.step4.selectPatternList &&
        !!stepData.step4.selectModleData
      ) {
        this.patternList = stepData.step4.selectPatternList;
        this.activePattern =
          this.patternList.length > 0 ? this.patternList[0] : "";
        this.selectModleData = stepData.step4.selectModleData;
      }
    },
    handleClick(tab, event) {
      //   this.$refs[this.activePattern].initData();
      console.log("this.activePattern======", this.activePattern);
      console.log(
        "this.$refs[this.activePattern]======",
        this.$refs[this.activePattern]
      );
      this.$refs[this.activePattern][0].initData();
      console.log(tab, event);
    },
    getSelectPaneData(key, value) {
      this.tabLineData[key] = value;
      console.log("this.tabLineData====", this.tabLineData);
    },
    getData() {
      return {};
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
    },
  },
  created: function () {
    this.calcHeightx();
  },
  computed: {},
};
</script>
<style scoped>
</style>
