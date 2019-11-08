import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import App from './App.vue'
import router from './router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.axios.defaults.baseURL = 'http://192.168.124.66:8081'

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
