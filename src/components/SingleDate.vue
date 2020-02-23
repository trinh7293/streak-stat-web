<template>
  <v-container>
    <v-layout row wrap >
      <v-flex xs2 v-for="goal in getPickedDateDataGoals" :key="goal.id">
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
import { START_STREAK, STREAK_NUM, IS_END_STREAK } from '../constants'

export default Vue.extend({
  name: 'SingleDate',
  components: {
    GoalInfo,
  },
  computed: {
    ...mapGetters(['getPickedDateDataGoals']),
    ...mapState(['pickedDate']),
  },
  data: () => ({
    getPickedDateDataSample: [
      {
        id: '1',
        name: 'Weaking',
        icon: 'We',
        [START_STREAK]: '20-2-2020',
        [STREAK_NUM]: 1,
        [IS_END_STREAK]: false,
      },
      {
        id: '2',
        name: 'Reading',
        icon: 'Re',
        [START_STREAK]: '20-2-2020',
        [STREAK_NUM]: 1,
        [IS_END_STREAK]: false,
      },
      {
        id: '3',
        name: 'Running',
        icon: 'Run',
        [START_STREAK]: '20-2-2020',
        [STREAK_NUM]: 0,
        [IS_END_STREAK]: false,
      },
    ],
  }),
})
</script>
