<template>
  <v-container>
    <v-layout row wrap>
      <DateTimeStreak />
      <SingleDate />
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import SingleDate from '@/components/SingleDate.vue'
import DateTimeStreak from '@/components/DateTimeStreak.vue'

export default Vue.extend({
  name: 'Today',
  components: {
    SingleDate,
    DateTimeStreak,
  },
})
</script>
