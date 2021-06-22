import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.less'
import router from "@/router";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import contribution from 'vue-contribution'
import 'vue-contribution/dist/vue-contribution.css'

Vue.use(iView);
Vue.use(contribution);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
