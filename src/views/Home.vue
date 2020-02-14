<template>
  <v-container>
    <v-layout row wrap>
      <date-time-streak />
      <GroupBtnStreak />
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import GroupBtnStreak from '@/components/GroupBtnStreak.vue'
import DateTimeStreak from '@/components/DateTimeStreak.vue'

export default Vue.extend({
  name: 'home',
  components: {
    GroupBtnStreak,
    DateTimeStreak,
  },
  created() {
    this.$store.dispatch('initPickedDayDataListener')
  },
})
</script>
