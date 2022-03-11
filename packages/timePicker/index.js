/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:39:44
 * @LastEditTime: 2022-03-11 16:07:28
 * @FilePath: \timePicker\packages\timePicker\index.js
 */
// src/index.js
// 导入组件，组件必须声明 name
import TimePickTest from './src/timePicker'
 
// 为组件提供 install 安装方法，供按需引入
TimePickTest.install = function (Vue) {
 Vue.component(TimePickTest.name, TimePickTest)
}
// 默认导出组件
export default TimePickTest