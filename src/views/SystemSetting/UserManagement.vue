<template>
  <el-form :inline="true" :model="filters" :size="size">
    <el-form-item>
      <el-input v-model="filters.name" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        icon="fa fa-search"
        :loading="loading"
        type="primary"
        plain
        @click="findPage(null)"
        >查询</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-button
        icon="fa fa-plus"
        :loading="loading"
        type="primary"
        plain
        @click="handleAdd"
        >新增</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      filters: {
        name: "",
      },
    };
  },
  methods: {},
};
</script>