<template>
  <main>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
          Best Streak: {{getStats.bestStreak}}
        </v-flex>
        <v-flex xs12 class="text-xs-center">
          Current Streak: {{getStats.currentStreak}}
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
          v-for="habit in settingHabits"
          :key="habit.habitId"
        >
          <v-checkbox
            :value="habit.habitId"
            :label="habit.name"
            v-model="habitSelected"
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
    habitSelected: [],
  }),
  computed: {
    ...mapState(['settingHabits']),
    ...mapGetters([
      'getListStreak',
      'getBestCompositionStreak',
      'getCurrentCompositionStreak',
    ]),
    getStats() {
      return {
        bestStreak: this
          .getBestCompositionStreak(this.habitSelected),
        currentStreak: this
          .getCurrentCompositionStreak(this.habitSelected),
      }
    },
    calendarAttr() {
      const listStreak: Array<Streak> = this
        .getListStreak(this.habitSelected)
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
