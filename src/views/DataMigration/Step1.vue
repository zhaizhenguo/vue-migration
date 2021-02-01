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
import { isObjectValueEqual } from "@/utils/objectUtil";
export default {
  components: {
    step1Form: step1Form,
  },

  data() {
    return {
      backSoureDataSource: {},
      backTargetDataSource: {},
    };
  },
  methods: {
    async getData() {
      let resData;
      //获取数据
      let sourceData = this.$refs.formSource.getData();
      let targetData = this.$refs.formTarget.getData();
      if (!sourceData || !targetData) {
        return false;
      }
      //测试连接
      let sourceTest = await this.$refs.formSource.testConnection();
      let targetTest = await this.$refs.formTarget.testConnection();
      if (!sourceTest || !targetTest) {
        return false;
      }
      //克隆对象
      let sourceDataClone = Object.assign({}, sourceData);
      let targetDataClone = Object.assign({}, targetData);
      [sourceDataClone, targetDataClone].forEach((item) => {
        this.$delete(item, "dataBase");
        this.$delete(item, "password");
        this.$delete(item, "driverData");
      });
      //检测迁移数据源端、目的端是否有变化
      this.dataSourceIsChange(sourceDataClone, targetDataClone);
      //源端与目的端连接相同时是否继续操作
      let falg = await this.dataSourceIsEqual(sourceDataClone, targetDataClone);
      resData = { sourceData, targetData };
      if (!falg) {
        resData = false;
      }
      return resData;
    },
    dataSourceIsChange(sourceDataClone, targetDataClone) {
      if (
        !isObjectValueEqual(this.backSoureDataSource, sourceDataClone) ||
        !isObjectValueEqual(this.backTargetDataSource, targetDataClone)
      ) {
        this.backSoureDataSource = sourceDataClone;
        this.backTargetDataSource = targetDataClone;
        this.$emit("updateInitState", false);
        this.$message({
          message: "迁移数据类型有变化",
          type: "success",
          duration: 1000,
        });
      }
    },
    async dataSourceIsEqual(sourceDataClone, targetDataClone) {
      let res = true;
      if (isObjectValueEqual(sourceDataClone, targetDataClone)) {
        await this.$confirm("检测到源端与目的端连接相同, 是否继续?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {
            res = false;
          });
      }
      return res;
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
