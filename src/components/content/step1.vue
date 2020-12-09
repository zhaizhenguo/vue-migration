<template>
  <div>
    <div class="contentFlex">
      <step1Form ref="formSource" class="leftContent"></step1Form>
      <i class="el-icon-d-arrow-right centerContent"></i>
      <step1Form ref="formTarget" class="rightContent"></step1Form>
    </div>
  </div>
</template>
<script>
import step1Form from "./subcontent/step1-form";
export default {
  components: {
    step1Form: step1Form,
  },
  data() {
    return {};
  },
  methods: {
    getData() {
      let sourceData = this.$refs.formSource.getData();
      let targetData = this.$refs.formTarget.getData();
      if (sourceData && targetData) {
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
