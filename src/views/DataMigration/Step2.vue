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
import migrationParams from "./Subcontent/step2-migrationParams";
import performanceParams from "./Subcontent/step2-performanceParams";
import monitoringParams from "./Subcontent/step2-monitoringParams";
import api from "@/components/Asset/Api";
export default {
  components: {
    migrationParams: migrationParams,
    performanceParams: performanceParams,
    monitoringParams: monitoringParams,
  },
  data() {
    return {
      activeName: "migrationParams",
      isLoading: false,
    };
  },
  methods: {
    initData() {
      if (!this.isLoading) {
        this.btnclickResetAll();
        this.isLoading = true;
      }
      this.$emit("updateLoadingState");
    },
    handleClick(tab, event) {},
    async getData() {
      let param = await this.getParam();
      if (!!param) {
        let isSuccess = await this.saveConfig(param);
        if (isSuccess) {
          return param;
        }
      }
      return false;
    },
    getParam() {
      let param = null;
      let migrationParams = this.$refs.migrationParams.getData();
      let performanceParams = this.$refs.performanceParams.getData();
      let monitoringParams = this.$refs.monitoringParams.getData();

      if (migrationParams && performanceParams && monitoringParams) {
        param = Object.assign(
          migrationParams,
          performanceParams,
          monitoringParams
        );
      }
      return param;
    },
    saveConfig(param) {
      return new Promise((resolve) => {
        let isSuccess = false;
        let configInfo = param;
        api.dataMigration.saveConfig(configInfo, (response) => {
          let res = response.data;
          if (res.code == 0) {
            isSuccess = true;
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1000,
            });
          } else {
            this.$message({
              message: "保存失败, " + res.msg,
              type: "error",
            });
          }
          resolve(isSuccess);
        });
      });
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
    btnclickResetAll() {
      this.$refs.migrationParams.btnclickReset();
      this.$refs.performanceParams.btnclickReset();
      this.$refs.monitoringParams.btnclickReset();
    },
  },
};
</script>
<style scoped>
.paramDiv {
  padding: 0px 30px 10px;
}
</style>
