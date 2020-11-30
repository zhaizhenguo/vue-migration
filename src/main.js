import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import request from "./my-request";

Vue.use(ElementUI, { size: "small", zIndex: 3000 });
Vue.config.productionTip = false;

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
/* eslint-disable no-new */
const vm = new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
