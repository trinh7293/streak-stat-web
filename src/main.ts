import Vue from 'vue'
import VCalendar from 'v-calendar'
import { auth } from '@/firebase_backend'
import Toasted, { ToastOptions } from 'vue-toasted'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// register the toast with the custom message
Vue.use(Toasted)
const option: ToastOptions = {
  position: 'top-right',
  theme: 'bubble',
  duration: 5000,
}
Vue.toasted.register('my_app_error',
  payload => {
    // if there is no message passed show default message
    if (!payload.message) {
      return 'Oops.. Something Went Wrong..'
    }

    // if there is a message show it with the message
    return `Oops.. ${payload.message}`
  }, option)


// register calendar
Vue.use(VCalendar, {
  // Use <vc-calendar /> instead of <v-calendar />
  componentPrefix: 'vc',
})

let app: Vue | null = null
auth.onAuthStateChanged(user => {
  store.dispatch('fetchUser', user)
  if (user) {
    store.dispatch('initHabitSettingListener')
    store.dispatch('initDayDataListener')
  }
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  } else if (user) {
    router.push('/')
  } else {
    router.push('/login')
  }
})
