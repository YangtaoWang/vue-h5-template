// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import infiniteScroll from 'vue-infinite-scroll'
import {LoadingPlugin, Loading, XButton, ToastPlugin} from 'vux'
import VueClipboard from 'vue-clipboard2'
// import { AjaxPlugin } from 'vux'
import './util/rem.js'
import store from '@/store'
Vue.config.productionTip = false
// Vue.use(infiniteScroll)
// Vue.use(AjaxPlugin)// 请求
Vue.component('loading', Loading)
Vue.component('x-button', XButton)
Vue.use(ToastPlugin)
Vue.use(VueClipboard)
Vue.use(LoadingPlugin)
// 首页禁止回退
history.pushState(null, null, document.URL)
window.addEventListener('popstate', function () {
  history.pushState(null, null, document.URL)
})
require('es6-promise').polyfill()
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
