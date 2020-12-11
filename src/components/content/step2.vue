<template>
  <div>
    <el-tabs
      style="height: 400px"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="迁移参数" name="migrationParams">
        <migrationParams
          ref="migrationParams"
          class="paramDiv"
        ></migrationParams>
      </el-tab-pane>
      <el-tab-pane label="性能参数" name="performanceParams">
        <performanceParams
          ref="performanceParams"
          class="paramDiv"
        ></performanceParams>
      </el-tab-pane>
      <el-tab-pane label="迁移监控参数" name="monitoringParams"
        ><monitoringParams
          ref="monitoringParams"
          class="paramDiv"
        ></monitoringParams
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import migrationParams from "./subcontent/step2-migrationParams";
import performanceParams from "./subcontent/step2-performanceParams.vue";
import monitoringParams from "./subcontent/step2-monitoringParams.vue";
export default {
  components: {
    migrationParams: migrationParams,
    performanceParams: performanceParams,
    monitoringParams: monitoringParams,
  },
  data() {
    return {
      activeName: "migrationParams",
    };
  },
  methods: {
    initData(sourceData) {},
    handleClick(tab, event) {
      console.log(this.getParam());
    },
    getData() {
      return this.getParam();
    },
    getParam() {
      let migrationParams = this.$refs.migrationParams.getData();
      let performanceParams = this.$refs.performanceParams.getData();
      let monitoringParams = this.$refs.monitoringParams.getData();
      console.log("migrationParams===", migrationParams);
      if (migrationParams && performanceParams && monitoringParams) {
        return { migrationParams, performanceParams, monitoringParams };
      }
    },
    btnclickReset() {
      if (this.activeName === "migrationParams") {
        this.$refs.migrationParams.btnclickReset();
      } else if (this.activeName === "performanceParams") {
        this.$refs.performanceParams.btnclickReset();
      } else if (this.activeName === "monitoringParams") {
        this.$refs.monitoringParams.btnclickReset();
      }
    },
  },
};
</script>
<style scoped>
.paramDiv {
  padding: 0px 30px 10px;
}
</style>
