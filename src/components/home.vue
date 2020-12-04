<template>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu
        default-active="oscar"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="oscar">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="HelloWorld">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view />
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      input: ""
    };
  },
  created() {},
  methods: {
    handleSelect(index, indexPath) {
      this.$router.push("/" + index);
      console.log(index, indexPath);
    }
  }
};
</script>

<style></style>
