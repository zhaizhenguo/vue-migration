import Vue from "vue";
import Router from "vue-router";
import dataMigration from "@/views/DataMigration/DataMigration";
import login from "@/views/Login";
import home from "@/views/Home";
import migrationHistory from "@/views/MigrationHistory/MigrationHistory";
import userManagement from "@/views/SystemSetting/UserManagement";
import roleManagement from "@/views/SystemSetting/RoleManagement";
import Cookies from "js-cookie";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import api from "@/components/Asset/Api";

NProgress.configure({
  easing: 'ease', // 动画方式    
  speed: 500, // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
});

Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/home",
      name: "home",
      // redirect: "home",
      component: home,
      children: [{
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
          path: "/userManagement",
          name: "userManagement",
          component: userManagement,
        },
        {
          path: "/roleManagement",
          name: "roleManagement",
          component: roleManagement,
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let token = Cookies.get('oscar-token');
  let userId = sessionStorage.getItem('userId');
  if (to.path === '/login') {
    if (token) {
      next({
        path: '/dataMigration'
      })
    } else {
      next()
    }
  } else {
    if (token) {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userId, to, from)
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})


/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userId, to, from) {
  if (!!window.vue._$common && window.vue._$common.menuRouteLoaded) {
    return
  }
  api.menu.findTree({
    userId: userId
  }, (Response) => {
    let res = Response.data;
    if (res.code == 0) {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(res.data)
      //   // 处理静态组件绑定路由
      //   handleStaticComponent(router, dynamicRoutes)
      //   router.addRoutes(router.options.routes)
      // 保存加载状态
      window.vue._$common.menuRouteLoaded = true;
      // 保存菜单树
      window.vue._$common.navTree = res.data;
    }
  })
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = ''
        for (let i = 0; i < array.length; i++) {
          url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1)
        // route['component'] = resolve => require([`@/views/${url}`], resolve)
      } catch (e) {}
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
})

export default router
