<template>
  <el-menu
    style="height: 100%"
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @select="handleSelect"
  >
    <!-- <el-menu-item
      v-for="item in menuArray"
      :key="item.index"
      :index="item.index"
    >
      <i :class="item.icon" aria-hidden="true"></i>
      <span slot="title">{{ item.lable }}</span>
    </el-menu-item> -->
    <MenuTree
      v-for="item in menuArray"
      :key="item.index"
      :menu="item"
    ></MenuTree>
  </el-menu>
</template> 
<script>
import MenuTree from "@/components/MenuTree";
export default {
  components: {
    MenuTree: MenuTree,
  },
  data() {
    return {
      menuArray: [
        { icon: "fa fa-exchange ", index: "/dataMigration", name: "数据迁移" },
        {
          icon: "fa fa-history ",
          index: "/migrationHistory",
          name: "迁移历史",
        },
        {
          icon: "fa fa-cog",
          index: "/systemSetting",
          name: "系统设置",
          children: [
            {
              icon: "fa fa-user-circle-o",
              index: "/userManagement",
              name: "用户管理",
            },
            {
              icon: "el-icon-view",
              index: "/roleManagement ",
              name: "角色管理",
            },
          ],
        },
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