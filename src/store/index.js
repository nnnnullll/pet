import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const  state={
  // 存储token
  token: localStorage.getItem('token') ? localStorage.getItem('token') : ''
}
const mutations={
  changeLogin (state, user) {
    state.token = user.token;
    localStorage.setItem('token', user.token);
  }
}
const actions={

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters : {
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token')
      }
      return state.token
    }
  }
})
