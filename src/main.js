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

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router,
  axios
}).$mount('#app')
