<template>
  <main>
    <v-btn class='mx-2' fab dark small v-bind:color='sttColor' v-on:click='toggleStt'>
      <v-icon class='caption'>{{goalKey}}</v-icon>
    </v-btn>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'
import editDateData from '@/api'

export default Vue.extend({
  name: 'BtnStreak',
  props: ['goalKey'],
  methods: {
    toggleStt() {
      const toggStt = !this.goalStt
      editDateData(this.pickedDate, {
        [this.goalKey]: toggStt,
      })
    },
  },
  computed: {
    ...mapState(['pickedDate', 'dateData']),
    goalStt() {
      return this.dateData[this.goalKey]
    },
    sttColor() {
      return this.goalStt ? 'green' : 'red'
    },
  },
})
</script>
