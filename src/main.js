import Vue from "vue";
import ElementUI from "element-ui";
import 'font-awesome/css/font-awesome.min.css'
import "element-ui/lib/theme-chalk/index.css";
import App from "@/App";
import router from "@/router";
import common from '@/utils/common'
import request from "@/my-request";
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client';

// var socket;
// socket = new WebSocket("ws://127.0.0.1:8081/");

Vue.use(ElementUI, {
  size: "small",
  zIndex: 3000
});
Vue.config.productionTip = false;
Vue.prototype._$common = common;
console.log("common======", common);
let commonClone = Object.assign({}, common);
Vue.prototype._$commonClone = commonClone;
Vue.prototype._$request = request;

window.vue = Vue.prototype;
// 全局导入组件
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components/base",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式, 这里可以匹配的文件名为BASEXxxx.vue格式
  /BASE[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  // 获取组件的 PascalCase 命名,剥去文件名开头的 `'./` 和结尾的扩展名
  const componentName =
    "z-" + fileName.replace(/^\.\/(.*)\.\w+$/, "$1").toLowerCase();

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});
// 关闭自动连接 
const socketOptions = {
  autoConnect: false
}

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio('localhost:8082', socketOptions)
}))
/* eslint-disable no-new */
const vm = new Vue({
  el: "#app",
  // 通过vue实例对象sockets实现组件中的事件监听
  sockets: {
    connect: function () {
      console.log("连接成功");
    },
    connecting: function () {
      console.log("正在连接");
    },
    disconnect: function () {
      console.log("断开连接");
    },
    connect_failed: function () {
      console.log("连接失败");
    },
    error: function () {
      console.log("发生错误");
    },
    reconnect: function () {
      console.log("重连成功");
    },
    reconnecting: function () {
      console.log("正在重连");
    },
    reconnect_failed: function () {
      console.log("重连失败");
    },
    msgEvent(data) {
      // 后端按主题名推送的消息数据
      console.log("msgEvent收到消息：" + data);
    },
  },
  router,
  render: h => h(App)
});
