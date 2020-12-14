<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="item in menuArray"
      :key="item.index"
      :index="item.index"
    >
      <i :class="item.icon" aria-hidden="true"></i>
      <span slot="title">{{ item.lable }}</span>
    </el-menu-item>
  </el-menu>
</template> 
<script>
export default {
  data() {
    return {
      menuArray: [
        { icon: "fa fa-exchange ", index: "/dataMigration", lable: "数据迁移" },
        {
          icon: "fa fa-history ",
          index: "/migrationHistory",
          lable: "迁移历史",
        },
        { icon: "fa fa-cog", index: "/systemSetting", lable: "系统设置" },
      ],
    };
  },
  created() {},
  methods: {
    handleSelect(index, indexPath) {
      this.$router.push(index).catch((err) => {});
      console.log(index, indexPath);
    },
  },
};
</script>
<style></style>