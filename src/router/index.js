import Vue from "vue";
import Router from "vue-router";
import oscar from "@/components/oscar";
import login from "@/components/login";
import home from "@/components/home";
import HelloWorld from "@/components/HelloWorld";
import test from "@/components/test";
import Cookies from "js-cookie";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            redirect: { name: "login" }
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
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
router.beforeEach((to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效。
    let token = Cookies.get('oscar-token')
    // let userName = sessionStorage.getItem('user')
    if (to.path === '/login') {
        if (token) {
            next({ path: '/oscar' })
        } else {
            next()
        }
    } else {
        if (token) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})
export default router