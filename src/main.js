import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import ky from "ky";
import 'buefy/dist/buefy.css'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faEdit,
  faAngleRight,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faTrash,
  faEdit,
  faAngleRight,
  faArrowUp
)

const api = ky.create({ prefixUrl: "https://us-central1-boookie-c96b3.cloudfunctions.net/app/" });
Vue.prototype.$http = api;

Vue.config.productionTip = false

Vue.component("vue-fontawesome", FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

new Vue({
  router,
  Buefy,
  store,
  render: h => h(App)
}).$mount('#app')
