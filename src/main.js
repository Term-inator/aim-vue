import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.less'
import router from "@/router";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import contribution from 'vue-contribution'
import 'vue-contribution/dist/vue-contribution.css'
import axios from 'axios'

Vue.use(iView);
Vue.use(contribution);

Vue.config.productionTip = false

axios.defaults.baseURL = "http://192.168.1.110:8080"
Vue.prototype.$axios = axios


// axios.interceptors.request.use(config => {
//   config.headers.token = window.localStorage.getItem("token")
//   config.headers.id = window.localStorage.getItem("userId")
//   return config
// })

new Vue({
  render: h => h(App),
  router,
  axios
}).$mount('#app')
