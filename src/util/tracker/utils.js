import extend from 'extend'

export const getEvent = (event) => {
  event = event || window.event
  if (!event) {
    return event
  }
  if (!event.target) {
    event.target = event.srcElement
  }
  if (!event.currentTarget) {
    event.currentTarget = event.srcElement
  }
  return event
}

export const getEventListenerMethod = () => {
  let addMethod = 'addEventListener'
  let removeMethod = 'removeEventListener'
  let prefix = ''
  if (!window.addEventListener) {
    addMethod = 'attachEvent'
    removeMethod = 'detachEvent'
    prefix = 'on'
  }
  return {
    addMethod,
    removeMethod,
    prefix
  }
}

export const getBoundingClientRect = (element) => {
  const rect = element.getBoundingClientRect()
  const width = rect.width || rect.right - rect.left
  const heigth = rect.heigth || rect.bottom - rect.top
  return extend({}, rect, {
    width,
    heigth
  })
}

export const stringify = (obj) => {
  let params = []
  for (let key in obj) {
    params.push(`${key}=${obj[key]}`)
  }
  return params.join('&')
}

export function getDomPath (element, useClass = false) {
  if (!(element instanceof HTMLElement)) {
    console.warn('input is not a HTML element!')
    return ''
  }
  let domPath = []
  let elem = element
  while (elem) {
    let domDesc = getDomDesc(elem, useClass)
    if (!domDesc) {
      break
    }
    domPath.unshift(domDesc)
    if (querySelector(domPath.join('>')) === element || domDesc.indexOf('body') >= 0) {
      break
    }
    domPath.shift()
    const children = elem.parentNode.children
    if (children.length > 1) {
      for (let i = 0; i < children.length; i++) {
        if (children[i] === elem) {
          domDesc += `:nth-child(${i + 1})`
          break
        }
      }
    }
    domPath.unshift(domDesc)
    if (querySelector(domPath.join('>')) === element) {
      break
    }
    elem = elem.parentNode
  }
  return domPath.join('>')
}

export function getDomDesc (element, useClass = false) {
  const domDesc = []
  if (!element || !element.tagName) {
    return ''
  }
  if (element.id) {
    return `#${element.id}`
  }
  domDesc.push(element.tagName.toLowerCase())
  if (useClass) {
    const className = element.className
    if (className && typeof className === 'string') {
      const classes = className.split(/\s+/)
      domDesc.push(`.${classes.join('.')}`)
    }
  }
  if (element.name) {
    domDesc.push(`[name=${element.name}]`)
  }
  return domDesc.join('')
}

export function querySelector (queryString) {
  return document.getElementById(queryString) || document.getElementsByName(queryString)[0] || document.querySelector(queryString)
}

export function getPerformance () {
  return new Promise((resolve) => {
    let perf = window.performance || window.webkitPerformance
    let timing = perf.timing
    // let navi = perf.navigation
    let timer = setInterval(function () {
      if (timing.loadEventEnd !== 0) {
        clearInterval(timer)
        var data = {
          url: window.location.href,
          ua: window.navigator.userAgent,
          dns: timing.domainLookupEnd - timing.domainLookupStart, // DNS 查询时间
          tcp: timing.connectEnd - timing.connectStart, // TCP 建立连接完成握手的时间
          request: timing.responseEnd - timing.responseStart, // 内容加载完成的时间
          blank: timing.domLoading - timing.fetchStart, // 首页白屏时间
          domready: timing.domContentLoadedEventEnd - timing.fetchStart, // dom渲染完成时间
          onload: timing.loadEventEnd - timing.fetchStart // 页面加载完成的时间, 几乎代表了用户等待页面可用的时间
        }
        resolve(data)
      }
    })
  })
}
