<template>
  <div>
    <div class="contentFlex">
      <step1Form
        ref="formSource"
        :paneName="'源端'"
        :connectionType="0"
        class="leftContent"
      ></step1Form>
      <i class="el-icon-d-arrow-right centerContent"></i>
      <step1Form
        ref="formTarget"
        :paneName="'目标端'"
        :connectionType="1"
        class="rightContent"
      ></step1Form>
    </div>
  </div>
</template>
<script>
import step1Form from "./Subcontent/step1-form";
export default {
  components: {
    step1Form: step1Form,
  },
  data() {
    return {
      backSoureDataSource: null,
      backTargetDataSource: null,
    };
  },
  methods: {
    getData() {
      let sourceData = this.$refs.formSource.getData();
      let targetData = this.$refs.formTarget.getData();
      if (sourceData && targetData) {
        //判断迁移数据源端、目的端是否有变化
        this._$common.dataSourceIsChange = false;
        if (
          this.backSoureDataSource !== sourceData.dataSource ||
          this.backTargetDataSource !== targetData.dataSource
        ) {
          this.backSoureDataSource = sourceData.dataSource;
          this.backTargetDataSource = targetData.dataSource;
          this._$common.dataSourceIsChange = true;
          this.$message({
            message: "迁移数据类型有变化",
            type: "success",
            duration: 1000,
          });
        }
        return { sourceData, targetData };
      }
    },
  },
};
</script>
<style scoped>
.contentFlex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.leftContent {
  flex: 1.3;
}
.centerContent {
  flex: 0.4;
  text-align: center;
  color: #409eff;
  font-size: 150px;
}
.rightContent {
  flex: 1.3;
}
</style>
