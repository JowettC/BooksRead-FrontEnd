import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import ky from "ky";
import 'buefy/dist/buefy.css'
import store from './store'


const api = ky.create({ prefixUrl: "http://localhost:3000/" });
Vue.prototype.$http = api;

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  Buefy,
  store,
  render: h => h(App)
}).$mount('#app')
