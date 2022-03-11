/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:39:44
 * @LastEditTime: 2022-03-10 16:42:20
 * @FilePath: \npmtest\packages\timePicker\index.js
 */
// src/index.js
// 导入组件，组件必须声明 name
import TimePick from './src/timePicker'
 
// 为组件提供 install 安装方法，供按需引入
TimePick.install = function (Vue) {
 Vue.component(TimePick.name, TimePick)
}
// 默认导出组件
export default TimePick