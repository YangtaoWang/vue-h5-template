import base from './base'

export default class index extends base {
  static async getSMS (params) {
    const url = this.baseUrl + 'message'
    return this.get(url, params)
  }
  // 唤起微信支付
  static async wepay (data) {
    const url = this.baseUrl + 'confirmPayWechatH5'
    return this.post(url, data)
  }
  // 验证是否微信支付成功
  static async releaseOrder (data) {
    const url = this.baseUrl + 'releaseOrderPayLock'
    return this.post(url, data)
  }
}
