import Vue from "vue";
import Router from "vue-router";
import oscar from "@/components/oscar";
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "oscar",
      component: oscar
    },
    {
      path: "/HelloWorld",
      name: "HelloWorld",
      component: HelloWorld
    }
  ]
});
