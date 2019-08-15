import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { http } from './utils/https'
import './permission'

Vue.prototype.$post = http.post;
Vue.prototype.$get = http.get;
Vue.prototype.$bus = new Vue;
Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
