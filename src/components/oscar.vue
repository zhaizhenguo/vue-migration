<template>
  <div class="fontColor">
    <el-header class="header">
      <el-row class="headerTitle">跨平台迁移工具</el-row>
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
    <el-main class="main" :style="'height:' + contentHeight + 'px;'">
      <el-card class="box-card">
        <step1 v-show="nowProcess === 1" ref="step1"></step1>
        <step2 v-show="nowProcess === 2" ref="step2"></step2>
        <step3 v-show="nowProcess === 3" ref="step3"></step3>
        <step4 v-show="nowProcess === 4" ref="step4"></step4>

        <step5 v-show="nowProcess === 5" ref="step5"></step5>

        <step6 v-show="nowProcess === 6" ref="step6"></step6>
        <step7 v-show="nowProcess === 7" ref="step7"></step7>
      </el-card>
    </el-main>
    <el-footer class="footer">
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
  </div>
</template>
<script>
import stepDesc from "./constant/stepDesc";
import step1 from "./content/step1";
import step2 from "./content/step2";
import step3 from "./content/step3";
import step4 from "./content/step4";
import step5 from "./content/step5";
import step6 from "./content/step6";
import step7 from "./content/step7";
import dialogParamConfig from "./dialog/dialogParamConfig";
import api from "./asset/api";
export default {
  name: "oscar",
  components: {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    step5: step5,
    step6: step6,
    step7: step7,
    dialogParamConfig: dialogParamConfig,
  },
  data() {
    return {
      contentHeight: window.innerHeight - 230,
      stepData: {},
      sumbitLoading: false,
      stepDesc: stepDesc,
      nowProcessStep: 0,
      value: "",
      options: [],
      dialogParamConfigVisible: false,
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
    // api.getShopList({}, response => {
    //   console.log("getShopList===", response);
    //   this.options = response.data.content;
    // });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getContentHeight);
  },
  methods: {
    getContentHeight() {
      this.contentHeight = window.innerHeight - 230;
    },
    btnclick(isDown) {
      if (isDown) {
        //保存数据逻辑
        let getData = this.$refs["step" + this.nowProcess].getData();
        if (!getData) {
          return;
        }
        console.log("step" + this.nowProcess + ":this.getData===", getData);
        this.stepData["step" + this.nowProcess] = getData;
        this.stepData["step" + this.nowProcess] = getData;
        console.log(
          "step" + this.nowProcess + ":this.stepData===",
          this.stepData
        );

        let initData = this.$refs["step" + (this.nowProcess + 1)].initData;
        if (typeof initData === "function") {
          initData(this.stepData);
        }
        this.nowProcessStep++;
      } else {
        this.nowProcessStep--;
      }
    },
    btnclickSumbit() {
      this.$refs["step3"].calResultData();
      //   this.sumbitLoading = true;
      //   api.postPay({}, response => {
      //     this.sumbitLoading = false;
      //     console.log("postPay===", response);
      //     this.$message({
      //       message: response.data.content,
      //       type: "success"
      //     });
      //   });
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: auto !important;
  padding: 0 100px;
}
.main {
  padding: 25px 150px 0px;
}
.footer {
  text-align: right;
  padding: 0 150px;
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
  width: auto;
  height: auto;
}
</style>
