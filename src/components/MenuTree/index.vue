<template>
  <el-submenu
    v-if="menu.children && menu.children.length >= 1"
    :index="'' + menu.index"
  >
    <template slot="title">
      <i :class="menu.icon" class="menuIcon"></i>
      <span slot="title">{{ menu.name }}</span>
    </template>
    <MenuTree
      v-for="item in menu.children"
      :key="item.index"
      :menu="item"
    ></MenuTree>
  </el-submenu>
  <el-menu-item v-else :index="'' + menu.index" @click="handleRoute(menu)">
    <i :class="menu.icon" class="menuIcon"></i>
    <span slot="title">{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleRoute(menu) {
      // 通过菜单URL跳转至指定路由
      this.$router.push(path);
    },
  },
};
</script>
<style>
.menuIcon {
  width: 30px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>