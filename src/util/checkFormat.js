/* eslint-disable */
let regExps = {
  chineseNum: /^[\u4e00-\u9fa5]{1,6}$/, // 1-6位中文
  name: /^[\u4E00-\u9FA5\·]+$/, // 正则包含少数民族名字
  xing: /^[A-Z]{1,8}$/,
  ming: /^[A-Z]{1,40}$/,
  idNumber: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证号
  phoneNumber: /^1([3|4|5|6|7|8|9|])\d{9}$/, // 手机号
  email: /^[-_A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  code: /^[0-9]{6}$/,
  code2: /^[0-9]{4}$/,
  account: /^[-_A-Za-z0-9\u4e00-\u9fa5]{1,30}$/,
  eleNumber: /^[0-9]{11}$/,
  passPort: /^[A-Za-z0-9]{8,9}$/,
  password: /^[A-Za-z0-9~!@#\$%\^&\*\(\)_\+\{\}\|:"<>\?`\-=\[\]\\;’,\.\/]{6,24}$/,
  userNamePhone: /^[A-Za-z0-9\u4e00-\u9fa5-_]+$/,
  number: /^[0-9]{6}$/
}
let formatWays = {
  getByteLen: function (val) { // 获取字符数
    let len = 0
    for (var i = 0; i < val.length; i++) {
      val.charAt(i).match(/[^\x00-\xff]/ig) != null ? len += 2 : len += 1
    }
    return len
  },
  overElippsis: function (str, length) { // 超出省略号
    return str.length > length ? str.substr(0, length) + '...' : str
  },
  limitByteLen: function (str, maxLen) {
    var w = 0
    // length 获取字符串长度，不区分汉字和英文
    for (var i = 0; i < str.length; i++) {
      // charCodeAt()获取字符串中某一个字符的编码
      var c = str.charCodeAt(i)
      // 单字节加1
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        w++
      } else {
        w += 2
      }
      if (w > maxLen) {
        str = str.substr(0, i)
        break
      }
    }
    return str
  },
  handelImageInRichText : function (details){ // 处理富文本中图片的样式
    var texts='';//待拼接的内容
    while(details.indexOf('<img') != -1){//寻找img 循环
      texts += details.substring('0', details.indexOf('<img') + 4);//截取到<img前面的内容
      details = details.substring(details.indexOf('<img') + 4);//<img 后面的内容
      if(details.indexOf('style=') != -1 && details.indexOf('style=') < details.indexOf('>')){
        texts += details.substring(0,details.indexOf('style="')+7)+"max-width:100%;height:auto;margin:0 auto;";//从 <img 后面的内容 截取到style= 加上自己要加的内容
        details = details.substring(details.indexOf('style="')+7); //style后面的内容拼接
      }else{
        texts += ' style="max-width:100%;height:auto;margin:0 auto;" ';
      }
    }
    texts += details;//最后拼接的内容
    return texts
  },
  /**
   * @param {*} date 时间格式
   * @param {*} fmt 'yyyy-MM-dd hh:mm:ss'
   * @returns
   */
  timeFormart: function (date, fmt) {
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
}
/**
 * @param {object} a
 * @param {object} b
 */
function isObjectValueEqual(a, b) {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);
  if (aProps.length !== bProps.length) return false;
  return aProps.filter((propName) => {
    if (typeof (aProps[propName]) === 'object') {
      return !this.isObjectValueEqual(aProps[propName], bProps[propName])
    } else {
      return a[propName] !== b[propName]
    }
  }).length === 0
}


export {
  regExps,
  formatWays
}
