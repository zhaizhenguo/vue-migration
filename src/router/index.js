import Vue from "vue";
import Router from "vue-router";
import dataMigration from "@/views/DataMigration/DataMigration";
import login from "@/views/Login";
import home from "@/views/Home";
import migrationHistory from "@/views/MigrationHistory/MigrationHistory";
import systemSetting from "@/views/SystemSetting/SystemSetting";
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
                    path: "/dataMigration",
                    name: "dataMigration",
                    component: dataMigration
                },
                {
                    path: "/migrationHistory",
                    name: "migrationHistory",
                    component: migrationHistory
                },
                {
                    path: "/systemSetting",
                    name: "systemSetting",
                    component: systemSetting
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    // 登录界面登录成功之后，会把用户信息保存在会话
    // 存在时间为会话生命周期，页面关闭即失效。
    let token = Cookies.get('oscar-token')
    console.log("token====",token);
    // let userName = sessionStorage.getItem('user')
    if (to.path === '/login') {
        if (token) {
            next({ path: '/dataMigration' })
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