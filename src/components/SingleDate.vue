<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(goal, i) in getPickedDateGoals"
          :key="i"
          cols="6"
        >
          <GoalInfo
            v-bind='goal'
            :pickedDate='pickedDate'
          />
        </v-col>
    </v-row>
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
        description: 'We',
        streakId: 'streakId1',
        start: '2020-02-07',
        streakCount: 5,
      },
      {
        goalId: 'goalId-2',
        name: 'Running',
        description: 'Ru',
        streakId: 'streakId2',
        start: '2020-02-08',
        streakCount: 5,
      },
      {
        goalId: '3',
        name: 'Reading',
        description: 'Re',
      },
    ],
  }),
})
</script>
