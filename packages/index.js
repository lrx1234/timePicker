/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:41:33
 * @LastEditTime: 2022-03-11 16:07:53
 * @FilePath: \timePicker\packages\index.js
 */
// 导入颜色选择器组件
import TimePickTest from "./timePicker/index.js";
 import '/packages/timePicker/src/element-components.js'
import 'element-ui/lib/theme-chalk/index.css'

// 存储组件列表
const components = [TimePickTest];
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
      console.log(component)
    Vue.component(component.name, component)
  });
};
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 以下是具体的组件列表
  TimePickTest
};