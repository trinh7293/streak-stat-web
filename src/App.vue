<template>
  <v-app>
    <v-content>
      <keep-alive>
        <component v-bind:is="currentTab.component" />
      </keep-alive>
    </v-content>
    <v-bottom-navigation
      dark
      grow
      app
      :value="currentTab"
      color="teal"
    >
      <v-btn
        v-for="tab in tabs"
        :key="tab.title"
        @click="currentTab = tab"
        :value="tab"
      >
        <span>{{ tab.title }}</span>
        <v-icon>{{ tab.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import Vue from 'vue'
import GoalsManagement from '@/views/GoalsManagement.vue'
import Home from '@/views/Home.vue'
import Statistic from '@/views/Statistic.vue'

const tabs = [
  {
    title: 'Home',
    icon: 'mdi-home',
    component: Home,
  },
  {
    title: 'Goals',
    icon: 'mdi-star',
    component: GoalsManagement,
  },
  {
    title: 'Stats',
    icon: 'mdi-chart-bar',
    component: Statistic,
  },
]

export default Vue.extend({
  data: () => ({
    tabs,
    currentTab: tabs[0],
  }),
  created() {
    this.$store.dispatch('initGoalSettingListener')
    this.$store.dispatch('initDayDataListener')
  },
})
</script>

<style scoped>
.v-bottom-navigation
.v-btn:not(.v-btn--round).v-size--default {
  height: inherit;
}
</style>
