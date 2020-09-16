import Vue from 'vue'
import Vuex from 'vuex'
// 加载封装本地储存模块
import { getItem, setItem } from '@/utlis/storage'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
    // 一个对象，存储当前登录用户登录信息（token等信息）
    // user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
    // user: null
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为了防止刷新数据丢失，我们需要把数据备份到本地储存
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
