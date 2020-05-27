<!--
 * @Descripttion: 订单页
 * @version: 1.0
 * @Author: wangyangtao
 * @Date: 2020-05-27 11:50:16
-->
<template>
  <div class="container">
    订单页面
    <div @click="getCheckCode" data-tracker='{"clickType": "1", "addParams": "aaa"}'>点击</div>
  </div>
</template>
<script>
export default {
  name: 'paySuccess',
  data () {
    return {
    }
  },
  async created () {
  },
  methods: {
    getCheckCode () {
      console.log('click')
    }
  }
}
</script>
<style lang="less">
  @baseColor: rgba(58, 58, 58, 1);
</style>
