import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
// import TestTime from '../views/TestTime.vue'
import SetupGoal from '../views/SetupGoal.vue'

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
    path: '/setup-goal',
    name: 'SetupGoal',
    // component: Home,
    // TODO edit test
    component: SetupGoal,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // component: Home,
  //   // TODO edit test
  //   component: About,
  // },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   // component: Home,
  //   // TODO edit test
  //   component: TestTime,
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
