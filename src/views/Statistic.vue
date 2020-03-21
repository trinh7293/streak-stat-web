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
        <v-flex xs6>
          <vc-calendar
            is-dark
            :attributes="calendarAttr"
          />
        </v-flex>
        <v-flex xs6>
          <v-container fluid>
            <v-checkbox
              v-for="goal in getSettingArray"
              :key="goal.goalId"
              :value="goal.goalId"
              :label="goal.name"
              v-model="goalSelected"
            ></v-checkbox>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

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
