import extend from 'extend'
import Vue from 'vue'
import {
  getEvent,
  getEventListenerMethod,
  getBoundingClientRect,
  stringify,
  getDomPath,
  getPerformance
} from './utils'

const DefaultOptions = {
  useClass: false,
  per: 0.01,
  events: ['click']
}

class Tracker {
  constructor () {
    this._isInstall = false
    this._options = {}
  }

  config (options = {}) {
    options = extend(true, {}, DefaultOptions, options)
    options.event = DefaultOptions.event
    this._options = options
    return this
  }
  async _sendPerformance () { // 发送性能监控
    let performanceInfo = await getPerformance()
    console.log(performanceInfo)
    this.send(performanceInfo)
  }
  _captureErrors () { // 异常埋点
    window.onerror = (msg, url, line) => { // 普通的报错
      this.send({errorType: 0, msg, url, line})
      return true
    }
    window.addEventListener('error', (error) => { // url资源加载中的异常
      this.send({errorType: 1, target: getDomPath(error.target)})
      return true
    }, true)
    window.addEventListener('unhandledrejection', (e) => { // 监听promise中的异常
      e.preventDefault()
      this.send({errorType: 2, reason: e.reason})
      return true
    })
    Vue.config.errorHandler = ({name, message, stack}) => { // 监听vue中的报错
      this.send({errorType: 3, name, message, stack})
      return true
    }
  }

  _captureEvents () {
    const self = this
    const events = this._options.events
    const eventMethodObj = getEventListenerMethod()
    for (let i = 0, j = events.length; i < j; i++) {
      let eventName = events[i]
      document.body[eventMethodObj.addMethod](eventMethodObj.prefix + eventName, function (event) {
        const eventFix = getEvent(event)
        if (!eventFix) {
          return
        }
        // self._handleEvent(eventFix)
        self._handleEventSimple(eventFix)
      }, false)
    }
  }
  _handleEventSimple (event) { // 简单版
    if (!event.target.dataset.tracker) return
    this.send(JSON.parse(event.target.dataset.tracker))
  }

  _handleEvent (event) { // 复杂版
    const per = parseFloat(this._options.per)
    if (!this.hit(per)) {
      return
    }
    const domPath = getDomPath(event.target, this._options.useClass)
    const rect = getBoundingClientRect(event.target)
    if (rect.width === 0 || rect.height === 0) {
      return
    }
    let t = document.documentElement || document.body.parentNode
    const scrollX = (t && typeof t.scrollLeft === 'number' ? t : document.body).scrollLeft
    const scrollY = (t && typeof t.scrollTop === 'number' ? t : document.body).scrollTop
    const pageX = event.pageX || event.clientX + scrollX
    const pageY = event.pageY || event.clientY + scrollY
    const data = {
      domPath: encodeURIComponent(domPath),
      trackingType: event.type,
      offsetX: ((pageX - rect.left - scrollX) / rect.width).toFixed(6),
      offsetY: ((pageY - rect.top - scrollY) / rect.height).toFixed(6)
    }
    // if (!event.target.dataset.tracker) return
    this.send(data)
  }

  send (data = {}) {
    // console.log('data', data)
    let image = new Image(1, 1)
    image.onload = function () {
      image = null
    }
    image.src = `/?${stringify(data)}`
  }

  hit (per = 0.01) {
    return Math.random() < per
  }

  install () {
    if (this._isInstall) {
      return this
    }
    this._sendPerformance() // 性能埋点
    this._captureErrors() // 异常埋点
    this._captureEvents() // 事件埋点
    this._isInstall = true
    return this
  }
}

export default Tracker
