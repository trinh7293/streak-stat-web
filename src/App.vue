<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex xs4
          v-for="route in routerDatas"
          :key="route.url"
        >
          <NavigatorButton
            :url='route.url'
            :title='route.title'
            :icon='route.icon'
            :class="`d-flex justify-center mb-6`"
          />
        </v-flex>
      <v-flex xs12>
        <router-view/>
      </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang='ts'>
import Vue from 'vue'
import NavigatorButton from
  '@/components/NavigatorButton.vue'

export default Vue.extend({
  components: {
    NavigatorButton,
  },
  data: () => ({
    routerDatas: [
      {
        url: '/',
        title: 'Home',
        icon: 'mdi-home',
      },
      // {
      //   url: '/about',
      //   title: 'About',
      //   icon: 'mdi-information',
      // },
      {
        url: '/goals',
        title: 'Goals',
        icon: 'mdi-star',
      },
      {
        url: '/statistic',
        title: 'Stats',
        icon: 'mdi-chart-bar',
      },
    ],
  }),
  created() {
    this.$store.dispatch('initGoalSettingListener')
    this.$store.dispatch('initDayDataListener')
  },
})
</script>

<style lang='scss'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
