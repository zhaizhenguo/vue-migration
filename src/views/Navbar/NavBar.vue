<template>
  <el-menu style="height: 100%" class="el-menu-vertical-demo">
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
  //   computed: {
  //     navTree() {
  //       console.log(
  //         "!!window.vue._$common.navTree===",
  //         window.vue._$common.navTree
  //       );
  //       return window.vue._$common.navTree;
  //     },
  //   },
  //   watch: {
  //     navTree: {
  //       handler(newVal) {
  //         console.log("newVal=======", newVal);
  //       },
  //       deep: true,
  //     },
  //   },
  data() {
    return {
      navTree: null,
    };
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