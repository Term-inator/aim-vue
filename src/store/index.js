import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    isLogin: false,
    user: {
      id: 0,
      token: 0
    }
  },
  mutations:{

  },
  actions:{

  },
  getters:{
    loginState() {
      return state.isLogin
    },
    getUser() {
      return state.user
    }
  }

})
export default store
