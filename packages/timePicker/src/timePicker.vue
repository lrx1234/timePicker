<!--
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:24:42
 * @LastEditTime: 2022-03-11 16:07:10
 * @FilePath: \timePicker\packages\timePicker\src\timePicker.vue
-->
<template>
  <div class="dateBox" @click.stop>
    <div @click="chooseTime" id="disable-cancle">
      <el-input
        style="width:200px;"
        size="mini"
        placeholder="请选择日期"
        suffix-icon="el-icon-date"
        disabled
        v-model="periodTime"
        @focus="chooseTime"
        class="mr25 periodTimeBg"
        clearable
      ></el-input>
    </div>
    <div v-if="isShow" class="timerbox" :style="right?{'left':'-100px'}:{}">
      <el-row style="margin-bottom:5px">
        开始时间：
        <DatePicker
          type="date"
          placeholder="开始日期"
          size="small"
          :value="startTime"
          :options="options"
          @on-change="changeStartMD"
          :editable="false"
          format="yyyy-MM-dd"
          :class="onlyChooseDate?'maxdateWidth':'dateWidth'"
          clearable="clearable"
          placement="bottom-end"
        ></DatePicker>
        <TimePicker :value="startTimeMin" @on-change="changeStartHM" format="HH:mm" size="small" :editable="false" placeholder="Select time" class="minWidth" v-if="!onlyChooseDate"></TimePicker>
      </el-row>
      <el-row>
        结束时间：
        <DatePicker
          type="date"
          placeholder="结束日期"
          size="small"
          :options="optionsEnd"
          @on-change="changeEndtMD"
          :value="endTime"
          :editable="false"
          format="yyyy-MM-dd"
          clearable="clearable"
           :class="onlyChooseDate?'maxdateWidth':'dateWidth'"
          placement="bottom-end"
        ></DatePicker>
        <TimePicker :value="endTimeMin" @on-change="changeEndtHM" format="HH:mm" size="small" :editable="false" placeholder="Select time" class="minWidth" v-if="!onlyChooseDate"></TimePicker>
      </el-row>
      <el-row class="quickChoose">
        <div class="before" v-if="quickTime.length!=0">
          <span>过去：</span>
          <el-button size="mini" type="primary" plain v-for="(i,k) in this.quickTime" :class="active == k ? 'addclass' : '' "  :key="k" @click="chooseQuickTime(k)">{{i.label}}</el-button>
        </div>
        <el-button size="mini" type="primary" @click="submit" class="submit">确定</el-button>
        <el-button size="mini" type="info" @click="clearTime" class="submit">清空</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { formartDate, timeFormatHM, periodTimeFormat, timeFormatMD,messageInstClose, messagePromp } from '../src/time' // 公用js、方法
import { DatePicker, TimePicker } from 'view-design'
import 'view-design/dist/styles/iview.css'

export default {
  name: 'TimePickTest',
  components: { DatePicker, TimePicker },
  props: {
    startTimeCon: {
      type: String
    },
    endTimeCon: {
      type: String
    },
    quickTimeCon: {
      type: Array
    },
    right: {
      // 调用传right任意值  代表组件在窗口右端使用 不会超出窗口
    },
    endDel: {
      type: Boolean,
      default: false
    },
    disabledDate: {

    },
    onlyChooseDate: {
      type: Boolean,
      default: false
    },
    quickchange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 6,
      clearable: false,
      periodTime: '', // 显示的日期
      isShow: false,
      startTime: '', // 开始时间的月日
      endTime: '', // 结束时间的月日
      startTimeMin: '', // 开始时间的时分
      endTimeMin: '', // 结束时间的时分
      quickTimeALL: [
        { label: '1小时', value: '1h', time: moment().subtract(1, 'hours')._d, refreshtime: function() {
          this.time = moment().subtract(1, 'hours')._d
        } },
        { label: '1天', value: '1day', time: moment().subtract(1, 'days')._d, refreshtime: function() {
          this.time = moment().subtract(1, 'days')._d
        } },
        { label: '1周', value: '1week', time: moment().subtract(1, 'weeks')._d, refreshtime: function() {
          this.time = moment().subtract(1, 'weeks')._d
        } },
        { label: '1月', value: '1month', time: moment().subtract(1, 'months')._d, refreshtime: function() {
          this.time = moment().subtract(1, 'months')._d
        } },
        { label: '1年', value: '1year', time: moment().subtract(1, 'years')._d, refreshtime: function() {
          this.time = moment().subtract(1, 'years')._d
        } }
      ],
      quickTime: [],
      options: {
        disabledDate(date) {
          return date.getTime() > new Date(new Date().getTime())
        }
      },
      optionsEnd: {
        disabledDate(date) {
          return date.getTime() > new Date(new Date().getTime())
        }
      },
      isdel: this.endDel,
      firstendTime: '',
      firstendTimeMin: ''
    }
  },
  mounted() {
    document.body.addEventListener('click', () => {
      this.isShow = false
    }, false)
    this.firstendTime = timeFormatMD(this.endTimeCon)
    this.firstendTimeMin = timeFormatHM(this.endTimeCon)
    this.assignment()
  },
  watch: {
    startTimeCon(newly) {
      if (newly) {
        this.startTimeCon = newly
        this.assignment()
      }
    },
    endTimeCon(newly) {
      if (newly) {
        this.endTimeCon = newly
        this.assignment()
      }
    },
    startTime(neww) {
      const endAll = this.firstendTime + ' ' + this.firstendTimeMin
      const timestamp = moment(endAll, 'YYYY-MM-DD HH:mm')._d.getTime()
      let endTime = ''
      if (this.endDel) {
        endTime = new Date(timestamp)
      } else {
        endTime = new Date(new Date().getTime())
      }
      this.optionsEnd = {
        disabledDate(date) {
          const comparOld = moment(date.getTime()).format('YYYY-MM-DD')
          const before = moment(comparOld).isBefore(moment(neww))
          const same = moment(comparOld).isSame(moment(neww))
          return (date.getTime() > endTime || ((before && !same) || (before && same)))
        }
      }
    },
    endTime() {
      const endAll = this.endTime + ' ' + this.endTimeMin
      const timestamp = moment(endAll, 'YYYY-MM-DD HH:mm')._d.getTime()
      this.options = {
        disabledDate(date) {
          return (date.getTime() > new Date(timestamp))
        }
      }
    }
  },
  methods: {
    // 清空时间
    clearTime() {
      this.isShow = false
      this.periodTime = ''
      this.$emit('clearTime')
    },
    assignment() {
      this.startTime = timeFormatMD(this.startTimeCon)
      this.startTimeMin = timeFormatHM(this.startTimeCon)
      this.endTime = timeFormatMD(this.endTimeCon)
      this.endTimeMin = timeFormatHM(this.endTimeCon)
      this.periodTime = periodTimeFormat(this.startTime, this.startTimeMin, this.endTime, this.endTimeMin)
      if (this.onlyChooseDate) {
        this.periodTime = periodTimeFormat(this.startTime, '', this.endTime, '')
      }
      this.quickTime = this.quickTimeALL.filter(item => this.quickTimeCon.indexOf(item.value) !== -1)
    },
    // 组件的显示
    chooseTime() {
      this.isShow = true
    },
    // 快捷选择时间
    chooseQuickTime(index) {
      this.active = index
      this.endTime = moment(Date.now()).format('YYYY-MM-DD')
      this.endTimeMin = moment(Date.now()).format('HH:mm')
      this.quickTime[index].refreshtime()
      this.startTime = moment(this.quickTime[index].time).format('YYYY-MM-DD')
      this.startTimeMin = moment(this.quickTime[index].time).format('HH:mm')

      if (!this.quickchange) {
        this.endTime = moment(Date.now()).format('YYYY-MM-DD')
        this.endTimeMin = moment(Date.now()).format('HH:mm')
        this.quickTime[index].refreshtime()
        this.startTime = moment(this.quickTime[index].time).format('YYYY-MM-DD')
        this.startTimeMin = moment(this.quickTime[index].time).format('HH:mm')
      } else {
        this.endTime = moment(Date.now() - 3600 * 1000 * 24 * 1).format('YYYY-MM-DD')
        this.endTimeMin = moment(Date.now() - 3600 * 1000 * 24 * 1).format('HH:mm')
        this.quickTime[index].refreshtime()
        this.startTime = moment(this.quickTime[index].time - 3600 * 1000 * 24 * 1).format('YYYY-MM-DD')
        this.startTimeMin = moment(this.quickTime[index].time - 3600 * 1000 * 24 * 1).format('HH:mm')
      }
      if (this.onlyChooseDate) {
        this.endTimeMin = '00:00'
        this.startTimeMin = '00:00'
        this.periodTime = periodTimeFormat(this.startTime, '', this.endTime, '')
      }
    },
    // 提交选择时间
    submit() {
      if (this.startTime === '' || this.startTimeMin === '' || this.endTime === '' || this.endTimeMin === '') {
        messagePromp('开始时间或结束时间不能为空！', 'warning', 0)
        return false
      }
      this.isShow = false
      this.periodTime = periodTimeFormat(this.startTime, this.startTimeMin, this.endTime, this.endTimeMin)
      if (this.onlyChooseDate) {
        this.endTimeMin = '00:00'
        this.startTimeMin = '00:00'
        this.periodTime = periodTimeFormat(this.startTime, '', this.endTime, '')
      }
      const startAll = this.startTime + ' ' + this.startTimeMin
      const last = formartDate(moment(startAll, 'YYYY-MM-DD HH:mm')._d)
      const endAll = this.endTime + ' ' + this.endTimeMin
      const cur = formartDate(moment(endAll, 'YYYY-MM-DD HH:mm')._d)
      this.$emit('sureTime', last, cur)
      messageInstClose()
    },
    changeStartMD(val) {
      this.active = 6
      this.startTime = val
    },
    changeStartHM(val) {
      this.active = 6
      this.startTimeMin = val
    },
    changeEndtMD(val) {
      this.active = 6
      this.endTime = val
    },
    changeEndtHM(val) {
      this.active = 6
      this.endTimeMin = val
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dateBox{
  position: relative;
  display: inline-block;
  z-index: 99;
}
.timerbox{
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.1);
    border: 1px solid #eeeeee;
    padding: 10px;
    font-size: 12px;
    // text-align: center;
    position: absolute;
    // top: 25px;
    width: 300px;
    z-index: 100;
}
.submit{
    float: right;
    margin-right:7px;
    margin-top:10px
}
.quickChoose{
    margin:5px 0;
    overflow: hidden;
}
.quickChoose span{
    cursor: pointer;
    padding: 2px;
    color: #333;
    border: 1px solid #ddd;
    background-color: #F7F7F7;
}
.quickChoose span:nth-child(1){
    cursor: pointer;
    color: #333;
    background-color: #ffffff;
    border: 0;
    margin-left:20px
}
.dateWidth{
    width: 120px;
}
.maxdateWidth{
  width: 213px;
}
.minWidth{
    width: 80px;
}
.before{
    float: left;
}
.periodTimeBg{
    background-color: #ffffff;
    cursor: pointer !important;
    z-index: 99;
}
.periodTimeBg .el-input__inner{
    cursor: pointer !important;
     background-color: #ffffff !important;
}
.periodTimeBg .el-input.is-disabled .el-input__icon{
    cursor: pointer !important;
}
#disable-cancle/deep/ .el-input.is-disabled .el-input__inner {
    cursor: pointer !important;
}
#disable-cancle/deep/ .el-input.is-disabled .el-input__icon {
  cursor: pointer !important;
}
.addclass {
  background: #0878A6 !important;
  color:#ffffff !important
}
</style>
