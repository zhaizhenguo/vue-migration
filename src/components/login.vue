<template>
  <el-button @click="login">登录</el-button>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      console.log("this===", this);
      this.$router.push("/oscar");
    }
  }
};
</script>
