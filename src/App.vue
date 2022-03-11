<!--
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:21:48
 * @LastEditTime: 2022-03-10 17:40:22
 * @FilePath: \npmtest\src\App.vue
-->
<template>
  <div id="app">
    <TimePick
      style="display:inline-block;"
      :quickTimeCon="['1h', '1day', '1week', '1month']"
      ref="TimePick"
      right="1"
      :startTimeCon="createStartTime"
      :endTimeCon="createEndTime"
      v-on:sureTime="batchInvoke"
      @clearTime="clearTime"
    ></TimePick>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'App',

    data() {
return {
       createStartTime: moment().subtract(6, 'days').startOf('day').format('YYYYMMDDHHmmss'),
      createEndTime: moment().endOf('day').format('YYYYMMDDHHmmss'),
  }
    },
  methods:{
        batchInvoke(starttime, endtime) {
      this.createStartTime = starttime.substr(0, starttime.length - 2) + '00'
      this.createEndTime = endtime.substr(0, endtime.length - 2) + '59'
      this.listProject()
    },
    clearTime() {
      this.createStartTime = null
      this.createEndTime = null
      this.listProject()
    }
  
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
