import VueRouter from 'vue-router'

import HomeContainer from './components/HomeContainer'
import StaticServer from './components/StaticServer'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/resource', component: StaticServer }
  ]
})
export default router
