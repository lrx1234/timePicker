/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:21:48
 * @LastEditTime: 2022-03-10 17:44:14
 * @FilePath: \npmtest\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import TimePick from '../packages/index'

Vue.use(TimePick)
new Vue({
  render: h => h(App),
}).$mount('#app')
