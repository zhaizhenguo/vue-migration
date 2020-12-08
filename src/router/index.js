import Vue from "vue";
import Router from "vue-router";
import oscar from "@/components/oscar";
import login from "@/components/login";
import home from "@/components/home";
import HelloWorld from "@/components/HelloWorld";
import test from "@/components/test";

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     path: "/",
        //     name: "login",
        //     component: login
        // },
        {
            path: "/home",
            name: "home",
            redirect: "home",
            component: home,
            children: [
                {
                    path: "/oscar",
                    name: "oscar",
                    component: oscar
                },
                {
                    path: "/HelloWorld",
                    name: "HelloWorld",
                    component: HelloWorld
                },
                {
                    path: "/test",
                    name: "test",
                    component: test
                }
            ]
        }
    ]
});
