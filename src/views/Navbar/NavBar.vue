<template>
  <el-menu
    :default-active="activeIndex"
    style="height: 100%"
    class="el-menu-vertical-demo"
  >
    <MenuTree v-for="item in navTree" :key="item.url" :menu="item"></MenuTree>
  </el-menu>
</template> 
<script>
import MenuTree from "@/components/MenuTree";
import api from "@/components/Asset/Api";
export default {
  components: {
    MenuTree: MenuTree,
  },
  data() {
    return {
      navTree: null,
      activeIndex: "/DataMigration/DataMigration",
    };
  },
  watch: {
    $route: {
      handler(route) {
        console.log(route);
      },
      immediate: true, // 此项须设置为true
    },
  },
  methods: {
    findMenutree() {
      api.menu.findTree(
        {
          userId: sessionStorage.getItem("userId"),
        },
        (Response) => {
          let res = Response.data;
          if (res.code == 0) {
            this.navTree = res.data;
          }
        }
      );
    },
  },
  created: function () {
    this.findMenutree();
  },
};
</script>