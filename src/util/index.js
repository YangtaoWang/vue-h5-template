/**
 *
 *
 * @param {*} date 时间格式
 * @param {*} fmt 'yyyy-MM-dd hh:mm:ss'
 * @returns
 */

function timeFormart (date, fmt) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
const ctx = (function ctx () {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }
  var ctx = window.location.origin
  return ctx
})()
const getIsWxClient = function () {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    return true
  }
  return false
}
export {
  ctx,
  timeFormart,
  getIsWxClient
}
