<template>
  <v-container>
    <v-layout row wrap >
      <v-flex
        xs2
        v-for="goal in getPickedDateGoals"
        :key="goal.goalId"
      >
      <!-- <v-flex
        xs12
        v-for="goal in getPickedDateDataSample"
        :key="goal.goalId"
      > -->
        <GoalInfo
          v-bind='goal'
          :pickedDate='pickedDate'
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import GoalInfo from '@/components/GoalInfo.vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
  name: 'SingleDate',
  components: {
    GoalInfo,
  },
  computed: {
    ...mapGetters(['getPickedDateGoals']),
    ...mapState(['pickedDate']),
  },
  data: () => ({
    getPickedDateDataSample: [
      {
        goalId: 'goalId-1',
        name: 'Weakup',
        icon: 'We',
        streakId: 'streakId1',
        start: '2020-02-07',
        streakCount: 5,
      },
      {
        goalId: 'goalId-2',
        name: 'Running',
        icon: 'Ru',
        streakId: 'streakId2',
        start: '2020-02-08',
        streakCount: 5,
      },
      {
        goalId: '3',
        name: 'Reading',
        icon: 'Re',
      },
    ],
  }),
})
</script>
