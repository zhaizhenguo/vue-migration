<template>
  <el-row class="tac">
    <el-col :span="4">
      <el-menu
        default-active="defaultActive"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuArray"
          :key="item.index"
          :index="item.index"
        >
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.lable }}</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      defaultActive: "oscar",
      menuArray: [
        { index: "oscar", lable: "数据迁移" },
        { index: "HelloWorld", lable: "迁移历史" },
        { index: "test", lable: "test" },
      ],
    };
  },
  created() {},
  methods: {
    handleSelect(index, indexPath) {
      this.$router.push("/" + index).catch((err) => {
        console.log("输出报错", err);
      });
      console.log(index, indexPath);
    },
  },
};
</script>

<style></style>
