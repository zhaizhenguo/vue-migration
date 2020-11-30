<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="btnClick">提交</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <z-baseinput :options="options" :value="value"></z-baseinput>
      </el-col>
    </el-row>
    <!-- <other1></other1> -->
  </div>
</template>

<script>
// import other from "./other/other";
import api from "./asset/api";
export default {
  name: "HelloWorld",
  //   components: {
  //     other1: other
  //   },
  data() {
    return {
      value: "",
      options: []
    };
  },
  created() {
    api.getShopList({}, response => {
      console.log("getShopList===", response);
      this.options = response.data.content;
    });
  },
  methods: {
    btnClick() {
      api.postPay({}, response => {
        console.log("postPay===", response);
        this.$message({
          message: response.data.content,
          type: "success"
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
