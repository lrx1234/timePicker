/*
 * @Author: liruixi
 * @Description: 
 * @Date: 2022-03-10 16:25:37
 * @LastEditTime: 2022-03-10 17:31:50
 * @FilePath: \npmtest\packages\timePicker\src\time.js
 */
import { Message } from 'element-ui-view'
// 关闭消息提示实例
export function messageInstClose() {
  if (Message) {
    Message.closeAll()
  }
}
/**
 *消息提示
 * @param {*} message 提示信息
 * @param {*} type 类型
 * @param {*} duration 存在时间
 * @param {*} showClose 是否显示关闭按钮
 * @param {*} extraObj 自定义添加项
    * 举例:messagePromp('返回成功','success',0,true,{
                onClose:function(){
                    console.log()
                }
            })
 */
 export function messagePromp(message, type = 'warning', duration, showClose = true, customClass, extraObj) {
  messageInstClose()
  if (type === 'success') {
    const obj = {
      message: message,
      type: type,
      duration: duration || 5000,
      showClose: showClose,
      customClass: customClass
    }
    if (extraObj) {
      for (const key in extraObj) {
        // eslint-disable-next-line no-prototype-builtins
        if (extraObj.hasOwnProperty(key)) {
          const element = extraObj[key]
          obj[key] = element
        }
      }
    }
    Message(obj)
  } else if (type === 'error' || type === 'warning' || type === 'info') {
    const obj = {
      message: message,
      type: type,
      duration: duration || 0,
      showClose: showClose,
      customClass: customClass
    }
    if (extraObj) {
      for (const key in extraObj) {
        // eslint-disable-next-line no-prototype-builtins
        if (extraObj.hasOwnProperty(key)) {
          const element = extraObj[key]
          obj[key] = element
        }
      }
    }
    Message(obj)
  } else {
    return false
  }
}

// 传给后台的时间格式201809121234
export function formartDate(param) {
  const date = new Date(param)
  const Y = (date.getFullYear()).toString()
  const M = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1).toString()
  const D = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()).toString()
  const h = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()).toString()
  const m = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()).toString()
  const s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()).toString()
  return Y + M + D + h + m + s
}

// 201911061555格式化2019-11-06
export function timeFormatMD(time) {
  return time.substring(0, 4) + '-' + time.substring(4, 6) + '-' + time.substring(6, 8)
}
// 201911061555格式化15:55
export function timeFormatHM(time) {
  return time.substring(8, 10) + ':' + time.substring(10, 12)
}

// 时间展示格式化
export function periodTimeFormat(sd, sh, ed, eh) {
  return sd.substring(5, sd.length) + ' ' + sh + ' ~ ' + ed.substring(5, ed.length) + ' ' + eh
}