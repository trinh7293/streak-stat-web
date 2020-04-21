import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Join from '@/views/Join.vue'
import HabitsManagement from '@/views/HabitsManagement.vue'
import Today from '@/views/Today.vue'
import Statistic from '@/views/Statistic.vue'
import About from '@/views/About.vue'
import { auth } from '@/firebase_backend'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Today',
    component: Today,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/habits',
    name: 'HabitsManagement',
    component: HabitsManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: Statistic,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/join',
    name: 'Join',
    component: Join,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const { currentUser } = auth
  const requiresAuth = to.matched
    .some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    if (!currentUser) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
