<template>
  <div class="fontColor">
    <el-header class="header">
      <!-- <el-row class="headerTitle">跨平台迁移工具</el-row> -->
      <el-row>
        <el-steps
          process-status="process"
          finish-status="finish"
          :active="nowProcessStep"
          align-center
        >
          <!-- https://www.cnblogs.com/5201314m/p/12356017.html -->
          <!-- <el-step title="步骤 1"
            ><img slot="icon" src="./img/111.jpg"
          /></el-step> -->

          <!-- <el-step v-for="(item, index) in stepDesc" :title="item.title">
            <img slot="icon" :src="index == nowProcess ? item.iconHover : item.icon" />
          </el-step> -->

          <el-step
            v-for="item in stepDesc"
            :key="item.title"
            :title="item.title"
          ></el-step>
        </el-steps>
      </el-row>
      <el-row class="headerDesc">{{ getDesc }}</el-row>
    </el-header>
    <!-- <el-main :style="`height:${contentHeight}px;padding: 45px 20px;`"> -->
    <el-main v-loading="loading" class="main">
      <el-card class="box-card">
        <step1
          @updateLoadingState="updateLoadingState"
          @updateInitState="updateInitState"
          v-show="nowProcess === 1"
          ref="step1"
        ></step1>
        <step2
          @updateLoadingState="updateLoadingState"
          v-show="nowProcess === 2"
          ref="step2"
        ></step2>
        <step3
          @updateLoadingState="updateLoadingState"
          v-show="nowProcess === 3"
          ref="step3"
        ></step3>
        <step4
          @updateLoadingState="updateLoadingState"
          v-show="nowProcess === 4"
          ref="step4"
        ></step4>
        <step5
          @updateLoadingState="updateLoadingState"
          v-show="nowProcess === 5"
          :stepData="stepData"
          ref="step5"
        ></step5>
      </el-card>
    </el-main>
    <el-footer class="footer">
      <el-button type="primary" @click="btnclickOPpen()">建立连接</el-button>
      <el-button type="primary" @click="btnclickClose()">关闭连接</el-button>
      <el-button type="primary" @click="btnclickMsg()">发送消息</el-button>
      <el-button
        v-show="nowProcess === stepDesc.length"
        type="primary"
        @click="btnclickExport()"
        :loading="sumbitLoading"
        >导出</el-button
      >
      <el-button
        v-show="nowProcess === stepDesc.length"
        type="primary"
        @click="btnclickParamConfig()"
        :loading="sumbitLoading"
        >参数配置</el-button
      >

      <el-button
        v-show="nowProcess === 2"
        type="primary"
        @click="btnclickReset()"
        :loading="sumbitLoading"
        >重置</el-button
      >
      <el-button type="primary" @click="btnclick(0)" :disabled="nowProcess == 1"
        >上一步</el-button
      >
      <el-button
        type="primary"
        @click="btnclick(1)"
        :disabled="nowProcess == stepDesc.length"
        :loading="nextStepLoding"
        >下一步</el-button
      >

      <el-button
        type="primary"
        @click="btnclickSumbit()"
        :loading="sumbitLoading"
        :disabled="nowProcess !== stepDesc.length"
        >完成</el-button
      >
    </el-footer>
    <div class="szBrand">2008-2020 神州通用数据技术有限公司</div>
    <dialogParamConfig
      v-if="dialogParamConfigVisible"
      :dialogParamConfigVisible="dialogParamConfigVisible"
      @closeParamConfig="closeParamConfig"
    ></dialogParamConfig>
    <dialogMigrationPlan
      ref="dialogMigrationPlan"
      v-if="dialogMigrationPlanVisible"
      :dialogMigrationPlanVisible="dialogMigrationPlanVisible"
      @closeDialogMigrationPlan="closeDialogMigrationPlan"
    >
    </dialogMigrationPlan>
  </div>
</template>
<script>
import stepDesc from "@/components/Constant/stepDesc";
import step1 from "./Step1";
import step2 from "./Step2";
import step3 from "./Step3";
import step4 from "./Step4";
import step5 from "./Step5";
import dialogParamConfig from "../Dialog/DialogParamConfig";
import dialogMigrationPlan from "../Dialog/DialogMigrationPlan";
import api from "@/components/Asset/Api";
export default {
  name: "dataMigration",
  components: {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    step5: step5,
    dialogParamConfig: dialogParamConfig,
    dialogMigrationPlan: dialogMigrationPlan,
  },
  data() {
    return {
      contentHeight: window.innerHeight - 250,
      stepData: {},
      //上一步按钮加载状态
      lastStepLoding: false,
      //下一步按钮加载状态
      nextStepLoding: false,
      sumbitLoading: false,
      stepDesc: stepDesc,
      nowProcessStep: 0,
      value: "",
      options: [],
      dialogParamConfigVisible: false,
      dialogMigrationPlanVisible: false,
      loading: false,
    };
  },
  computed: {
    nowProcess() {
      return this.nowProcessStep + 1;
    },
    getDesc() {
      return this.stepDesc[this.nowProcessStep].desc;
    },
  },
  created() {
    window.addEventListener("resize", this.getContentHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getContentHeight);
  },
  sockets: {
    // 通过vue实例对象sockets实现组件中的事件监听
    connect: function () {
      console.log("连接成功");
    },
    connecting: function () {
      console.log("正在连接");
    },
    disconnect: function () {
      console.log("断开连接");
    },
    connect_failed: function () {
      console.log("连接失败");
    },
    error: function () {
      console.log("发生错误");
    },
    reconnect: function () {
      console.log("重连成功");
    },
    reconnecting: function () {
      console.log("正在重连");
    },
    msgEvent(data) {
      // 后端按主题名推送的消息数据
      console.log("msgEvent收到消息：" + data);
    },
  },

  //   mounted() {
  //     console.log("mounted 在页面加载时发起订阅");
  //   },
  methods: {
    btnclickOPpen() {
      // 开始连接socket
      this.$socket.open();
    },
    btnclickClose() {
      // 关闭连接socket
      this.$socket.close();
    },
    btnclickMsg() {
      this.$socket.emit("msgEvent", "我是客户端");
    },
    getContentHeight() {
      //   this.contentHeight = window.innerHeight - 230;
    },
    async btnclick(isDown) {
      if (isDown) {
        this.loading = true;
        this.nextStepLoding = true;
        //保存数据逻辑
        let param = await this.$refs["step" + this.nowProcess].getData();
        console.log("保存数据逻辑", param);
        if (!param) {
          this.updateLoadingState();
          return;
        }
        let resName = "step" + this.nowProcess;
        switch (resName) {
          case "step1":
            this.stepData["databaseData"] = param;
            break;
          case "step2":
            this.stepData["projectConfigInfo"] = param;
            break;
          case "step3":
            this.stepData["colMapRelation"] = param;
            break;
          case "step4":
            this.stepData["schemaData"] = param.schemaData;
            this.stepData["selectSchemaData"] = param.selectSchemaData;
            this.stepData["selectSchemaNameList"] = param.selectSchemaNameList;
            this.stepData["migrationConfigInfo"] = param.migrationConfigInfo;
            break;
          default:
            this.stepData[resName] = param;
            break;
        }

        console.log("this.stepData=====", this.stepData);
        let initData = this.$refs["step" + (this.nowProcess + 1)].initData;
        if (typeof initData === "function") {
          initData(this.stepData);
        }
        this.nowProcessStep++;
      } else {
        let initData = this.$refs["step" + (this.nowProcess - 1)].initData;
        if (typeof initData === "function") {
          this.loading = true;
          this.lastStepLoding = true;
          initData(this.stepData);
        }
        this.nowProcessStep--;
      }
    },
    // 更新页面和按钮loading状态
    updateLoadingState() {
      this.nextStepLoding = false;
      this.loading = false;
    },
    // 更新各步骤初始化状态
    updateInitState(falg) {
      ["step2", "step3", "step4", "step5"].forEach((item) => {
        this.$refs[item].isLoading = falg;
      });
    },
    btnclickSumbit() {
      this.saveMigrationInfo(this.stepData["migrationConfigInfo"]);
      this.saveSchemaInfo(this.stepData["schemaData"]);

      this.dialogMigrationPlanVisible = true;
      this.$nextTick(() => {
        this.$refs.dialogMigrationPlan.test();
      });
    },
    saveMigrationInfo(param) {
      api.dataMigration.saveMigrationInfo(param, (response) => {
        let res = response.data;
        if (res.code == 0) {
          this.$message({
            message: "保存模式参数成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "保存模式参数失败, " + res.msg,
            type: "error",
          });
        }
      });
    },
    saveSchemaInfo(param) {
      api.dataMigration.saveSchemaInfo(param, (response) => {
        let res = response.data;
        if (res.code == 0) {
          this.$message({
            message: "@保存模式信息成功",
            type: "success",
          });
          this.startMigration();
        } else {
          this.$message({
            message: "@保存模式信息失败, " + res.msg,
            type: "error",
          });
        }
      });
    },
    startMigration() {
      api.dataMigration.startMigration(null, (response) => {
        let res = response.data;
        if (res.code != 0) {
          this.$message({
            message: "执行迁移失败," + res.msg,
            type: "error",
          });
        }
      });
    },
    btnclickReset() {
      this.$refs.step2.btnclickReset();
    },
    btnclickExport() {
      this.$refs.step2.btnclickExport();
    },
    btnclickParamConfig() {
      this.dialogParamConfigVisible = true;
    },
    closeParamConfig() {
      this.dialogParamConfigVisible = false;
    },
    closeDialogMigrationPlan() {
      this.dialogMigrationPlanVisible = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: auto !important;
}
.main {
  padding: 25px 100px 0px 70px;
  height: calc(100vh - 250px);
}
.footer {
  text-align: right;
  padding: 0 150px;
  height: 100% !important;
}
.headerTitle {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin: 15px 0;
  color: black;
}
.szBrand {
  font-size: small;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #606266;
}
.headerDesc {
  margin: 10px 0px 0px 50px;
  color: #606266;
  font-size: 15px;
}
.fontColor {
  color: #606266;
}
.box-card {
  color: #606266;
  width: auto;
  height: auto;
}
</style>
