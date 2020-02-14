<template>
  <v-container>
    <v-layout row wrap >
      <btn-streak :goalKey='WEAKING_UP_EARLY' />
      <btn-streak :goalKey='RUNNING' />
      <btn-streak :goalKey='READING' />
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import BtnStreak from '@/components/BtnStreak.vue'
import { WEAKING_UP_EARLY, RUNNING, READING } from '@/constants'

export default Vue.extend({
  name: 'home',
  components: {
    BtnStreak,
  },
  data() {
    return {
      WEAKING_UP_EARLY,
      RUNNING,
      READING,
    }
  },
})
</script>
