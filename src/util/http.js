import Vue from 'vue'
import {AjaxPlugin} from 'vux'
Vue.use(AjaxPlugin) // 请求
export default class http {
  static async request (method, url, data, loading = false) {
    const param = {
      url: url,
      method
    }
    if (method === 'GET') {
      param.params = data
    } else {
      param.data = data
    }

    const res = await Vue.http(param)
    if (this.isSuccess(res)) {
      return res.data
    } else {
      throw this.requestExction(res)
    }
  }
  static isSuccess ({status}) {
    // console.log(status)
    return status === 200
  }
  static requestExction (res) {
    return res
  }
  static get (url, data, loading = true) {
    return this.request('GET', url, data, loading)
  }
  static post (url, data, loading = true) {
    return this.request('POST', url, data, loading)
  }
}
