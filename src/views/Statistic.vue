<template>
  <main>
    <v-container>
      <v-layout row wrap>
        <v-flex xs6>
          bestStreak: {{getStats.bestStreak}}
        </v-flex>
        <v-flex xs6>
          currentStreak: {{getStats.currentStreak}}
        </v-flex>
        <v-flex xs3></v-flex>
        <v-flex xs6>
          <vc-calendar
            is-dark
            :attributes="calendarAttr"
          />
        </v-flex>
        <v-flex xs3></v-flex>
        <v-flex
          xs4
          v-for="goal in settingGoals"
          :key="goal.goalId"
        >
          <v-checkbox
            :value="goal.goalId"
            :label="goal.name"
            v-model="goalSelected"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'

export default Vue.extend({
  data: () => ({
    goalSelected: [],
  }),
  computed: {
    ...mapState(['settingGoals']),
    ...mapGetters([
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
    calendarAttr() {
      const listStreak: Array<Streak> = this
        .getListStreak(this.goalSelected)
      return [{
        key: 'today',
        highlight: true,
        dates: listStreak.map(streak => ({
          start: moment(streak.start).toDate(),
          end: moment(streak.end).toDate(),
        })),
      }]
    },
  },
})
</script>
