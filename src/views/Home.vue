<template>
  <main>
    <v-btn @click='logout'>Sign Out</v-btn>
    Hello {{user.displayName}}
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
  </main>
</template>

<script>
import Vue from 'vue'
import HabitsManagement from
  '@/components/HabitsManagement.vue'
import Today from '@/components/Today.vue'
import Statistic from '@/components/Statistic.vue'
import {
  userSignOut,
} from '@/api'
import { mapGetters, mapState } from 'vuex'

const tabs = [
  {
    title: 'Today',
    icon: 'mdi-home',
    component: Today,
  },
  {
    title: 'Habits',
    icon: 'mdi-star',
    component: HabitsManagement,
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
  methods: {
    // importData,
    async logout() {
      try {
        await userSignOut()
      } catch (error) {
        this.$toasted.global.my_app_error(error)
        console.log('error in Sign Out', error)
      }
    },
  },
  computed: {
    ...mapGetters(['getDisplayName']),
    ...mapState(['user']),
  },
  created() {
    this.$store.dispatch('initHabitSettingListener')
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
