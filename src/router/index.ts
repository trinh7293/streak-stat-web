import Vue from 'vue'
import VueRouter from 'vue-router'
import GoalsManagement from '@/views/GoalsManagement.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Statistic from '../views/Statistic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    // TODO edit test
    component: Home,
  },
  {
    path: '/goals',
    name: 'GoalsManagement',
    // component: Home,
    // TODO edit test
    component: GoalsManagement,
  },
  {
    path: '/about',
    name: 'About',
    // component: Home,
    // TODO edit test
    component: About,
  },
  {
    path: '/statistic',
    name: 'Statistic',
    // component: Home,
    // TODO edit test
    component: Statistic,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
