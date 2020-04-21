<template>
  <v-app>
    <main>
      <v-btn
        v-show="isAuthenticated"
        dark
        color="primary"
        @click='logout'
      >
        Log out
        <v-icon right dark>mdi-logout</v-icon>
      </v-btn>
      <p class="text-center display-1" v-if="user">
        {{user.displayName}} 's HABITS
      </p>
      <v-content>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-content>
      <v-bottom-navigation
        v-show="isAuthenticated"
        dark
        grow
        app
        :background-color="bottomNav.backColor"
        :color="bottomNav.color"
      >
        <v-btn
          exact
          v-for="(item, index) in navItems"
          :key="index"
          :to="item.url"
          :value="item"
        >
          <span>{{ item.title }}</span>
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { userSignOut } from '@/api'

export default Vue.extend({
  computed: {
    ...mapState(['isAuthenticated', 'user']),
  },
  methods: {
    async logout() {
      try {
        this.$store.dispatch('unsubAllListerners')
        await userSignOut()
      } catch (error) {
        this.$toasted.global.my_app_error(error)
        console.log('error in Sign Out', error)
      }
    },
  },
  // created() {
  //   const { currentRoute } = this.$router
  //   console.log('currentRoute: ', currentRoute)
  //   const currentNav = this.navItems.find(
  //     nav => nav.name === currentRoute.name,
  //   )
  //   this.bottomNav = currentNav || {
  //     title: 'Today',
  //     icon: 'mdi-home',
  //     url: '/',
  //     backColor: 'dark',
  //     color: 'indigo',
  //   }
  // },
  data() {
    return {
      bottomNav: {
        title: 'Today',
        icon: 'mdi-home',
        url: '/',
        backColor: 'dark',
        color: 'primary',
      },
      navItems: [
        {
          title: 'Today',
          icon: 'mdi-home',
          url: '/',
          backColor: 'dark',
          color: 'primary',
        },
        {
          title: 'Habits',
          icon: 'mdi-star',
          url: '/habits',
          backColor: 'dark',
          color: 'primary',
        },
        {
          title: 'Stats',
          icon: 'mdi-chart-bar',
          url: '/statistic',
          backColor: 'dark',
          color: 'primary',
        },
        {
          title: 'About',
          icon: 'mdi-head-snowflake-outline',
          url: '/about',
          backColor: 'dark',
          color: 'primary',
        },
      ],
    }
  },
})
</script>

<style scoped>
.v-bottom-navigation
.v-btn:not(.v-btn--round).v-size--default {
  height: inherit;
}
</style>
