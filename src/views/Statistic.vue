<template>
  <main>
    bestStreak: {{getStats.bestStreak}}
    currentStreak: {{getStats.currentStreak}}
    <v-date-picker
      v-model="date"
      :allowed-dates="allowedDates"
      class="mt-4"
    ></v-date-picker>
    <v-container fluid>
      <v-checkbox
        v-for="goal in getSettingArray"
        :key="goal.goalId"
        :value="goal.goalId"
        :label="goal.name"
        v-model="goalSelected"
      ></v-checkbox>
    </v-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default Vue.extend({
  data: () => ({
    goalSelected: [],
  }),
  computed: {
    ...mapGetters([
      'getSettingArray',
      'getListStreak',
      'getBestCompositionStreak',
      'getCurrentCompositionStreak',
    ]),
    getStats() {
      return {
        bestStreak: this
          .getBestCompositionStreak(this.goalSelected),
        currentStreak: this
          .getCurrentCompositionStreak(this.goalSelected),
      }
    },
    allowedDates() {
      const listStreak: Array<Streak> = this
        .getListStreak(this.goalSelected)
      return (val: string) => _.some(
        listStreak,
        range => moment(val).isBetween(
          moment(range.from),
          moment(range.to),
          undefined,
          '[]',
        ),
      )
    },
  },
})
</script>
