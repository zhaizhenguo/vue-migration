<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">
      <testChild />
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second"><testChild /></el-tab-pane>
    <el-tab-pane label="角色管理" name="third"><testChild /></el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth"><testChild /></el-tab-pane>
  </el-tabs>
</template>
<script>
import testChild from "./testChild";
export default {
  components: {
    testChild,
  },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
