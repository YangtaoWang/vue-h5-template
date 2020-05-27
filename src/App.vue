<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import Tracker from './util/tracker/tracker.js'
export default {
  name: 'App',
  created () {
    const tracker = new Tracker()
    tracker.config({per: 0.9}).install()
  }
}
</script>

<style lang='less'>
@import '~vux/src/styles/reset.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// 解决loading 样式异常
.vux-loading {
  font-size: 16px;
  .weui-toast {
    top: 15em;
  }
}
// 解决safari 原生键盘复制到input 背景变黄
input {
  -webkit-appearance: none;
}
input:-webkit-autofill {
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
}
</style>
