import Vue from 'vue'
import VCalendar from 'v-calendar'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VCalendar, {
  // Use <vc-calendar /> instead of <v-calendar />
  componentPrefix: 'vc',
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
