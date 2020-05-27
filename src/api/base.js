import http from '../util/http'
import router from '../router'
let baseUrl
let enHeUrl
let sunlandsApi = '/sunlands-app-api/thrill/'
let enHeApi = '/adultapp-api/api/thrill/'
if (process.env.NODE_ENV === 'production') {
  baseUrl = `https://ieaorg.cn${sunlandsApi}`
  enHeUrl = `https://ieaorg.cn${enHeApi}`
}
if (process.env.NODE_ENV === 'development') {
  // 干一些测试时不可告人的事情
  baseUrl = `http://172.18.70.102:8246${sunlandsApi}`
  enHeUrl = `http://172.18.70.102:8246${enHeApi}`
}
if (process.env.NODE_ENV === 'test') {
  baseUrl = `http://172.18.70.102:8246${sunlandsApi}`
  enHeUrl = `http://172.18.70.102:8246${enHeApi}`
}
export default class base {
  static baseUrl = baseUrl
  static get = http.get.bind(http);
  static post = http.post.bind(http);
  static sleep = (time, cb) => {
    return new Promise((resolve) => setTimeout(() => {
      cb && cb()
      resolve()
    }, time))
  }
  static getBaseUrl = () => {
    let appType = router.history.current.query.appType ? router.history.current.query.appType : '0'
    const typeMapBaseUrl = {
      '0': baseUrl, // IEA
      '1': enHeUrl // 恩和
    }
    return typeMapBaseUrl[appType]
  }
}
