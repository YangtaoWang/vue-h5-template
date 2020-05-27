/*
 * @Descripttion: store
 * @version: 1.0
 * @Author: wangyangtao
 * @Date: 2020-05-27 11:19:29
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 0,
    testNO: 1
  },
  mutations: {
    changeTest (state, data) {
      state.test = data
    },
    changeTestNO (state, data) {
      state.testNO = data
    },
    INIT_STORE (state) {
      if (localStorage.getItem('store')) {
        let old = JSON.parse(localStorage.getItem('store'))
        this.replaceState(old) // 替换store的根节点
      }
    }
  },
  getters: {
  },
  actions: {
  }
})

store.subscribe((mutation, state) => {
  let noNeedsStores = ['INIT_STORE', 'changeTestNO', 's'] // 不需要保存到本地的mutation名称
  if (noNeedsStores.indexOf(mutation.type) > -1) return
  let oldState = localStorage.getItem('store') ? JSON.parse(localStorage.getItem('store')) : localStorage.getItem('store')
  let store = oldState && oldState !== '' ? Object.assign(oldState, state) : state
  localStorage.setItem('store', JSON.stringify(store))
})

export default store
