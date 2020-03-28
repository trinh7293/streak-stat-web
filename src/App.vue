<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
    <v-bottom-navigation
      dark
      grow
      app
      :value="activeBtn"
      color="teal"
    >
      <v-btn
        v-for="item in items"
        :key="item.title"
        :to="item.url"
        :value="item.url"
      >
        <span>{{ item.title }}</span>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    activeBtn: '/',
    items: [
      {
        url: '/',
        title: 'Home',
        icon: 'mdi-home',
      },
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
}
</script>

<style scoped>
.v-bottom-navigation
.v-btn:not(.v-btn--round).v-size--default {
  height: inherit;
}
</style>
