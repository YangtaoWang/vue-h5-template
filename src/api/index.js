import base from './base'

export default class index extends base {
  static async whatever (params) {
    const url = this.baseUrl + '/test'
    return this.get(url, params)
  }
  static async getIndexInfo (goodsId) {
    const url = this.baseUrl + `getGoodsInfo?goodsId=${goodsId}`
    return this.get(url)
  }
  // 支付宝
  static async getAliInfo (params) {
    const url = this.baseUrl + `confirmPay`
    return this.post(url, params)
  }
  // 0元购
  static async confirmFreePay (params) {
    const url = this.baseUrl + `confirmFreePay`
    return this.post(url, params)
  }
  static async getTeacherInfo (params) {
    const url = this.baseUrl + 'getTeacherInfo'
    return this.get(url, params)
  }
  static async h5AliPay (params) {
    const url = this.getBaseUrl() + `../paymentOrder/h5AliPay`
    return this.post(url, params)
  }
}
