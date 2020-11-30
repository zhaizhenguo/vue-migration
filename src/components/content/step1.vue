<template>
  <div>
    <div class="contentFlex">
      <form1 ref="formSource" class="leftContent"></form1>
      <i class="el-icon-d-arrow-right centerContent"></i>
      <form1 ref="formTarget" class="rightContent"></form1>
    </div>
  </div>
</template>
<script>
import form1 from "./form1";
export default {
  components: {
    form1: form1,
  },
  data() {
    return {};
  },
  methods: {
    getData() {
      let formSourceDate = this.$refs.formSource.getData();
      let formTargetDate = this.$refs.formTarget.getData();
      console.log("formSourceDate===", formSourceDate);
      if (formSourceDate && formTargetDate) {
        return { formSourceDate, formTargetDate };
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
