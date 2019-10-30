import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://192.168.124.11:8081'

new Vue({
  render: function (h) { return h(App) }
}).$mount('#app')
