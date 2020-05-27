/* eslint-disable */
import wx from 'weixin-js-sdk'
import jsapi from '@/api/jsapi'
import detailApi from '@/api/detail'
export default {
  methods: {
    async wechatInit () {
      // 初始化
      const { data: {
        appId,
        nonceStr,
        signature,
        timestamp} } = await jsapi.getSignature({url: window.location.href.split('#')[0]})

      wx.config({
        // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: [
          'chooseWXPay'
        ]
      })
    },
    async getOpenId(code) {
      const {data} = await jsapi.getOpenId({code})
      this.$store.commit('SET_OPENID', data.openId)
    },
    async createJsApiOrder(params) {
      const that = this
      params.payType = 2
      params.openId = this.$route.query.openId
      const { code, data } = await jsapi.createOrder(params)
      if(code !== 200 ) {
        this.handelErrorCode(code)
      }
      wx.chooseWXPay({
        timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
        package: data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: data.paySign, // 支付签名
        success: function (res) {
          if(res.errMsg === 'chooseWXPay:ok') {
            that.$router.push({name: 'paySuccess', params: {landingPageNo: that.$route.query.landingPageNo, telephone: that.phoneNumber, id: that.$route.query.goodsId}})
          } else {
            that.$vux.toast.text(res.errMsg)
          }
        },
        cancel: function (res) {
          detailApi.releaseOrder({subOrdNo: data.bizSubOrdNo})
          // that.$vux.toast.text('取消支付')
        },
        fail: function (res) {
          that.$vux.toast.text('支付失败, 请稍后再试')
        }
      })
    }
  }
}
