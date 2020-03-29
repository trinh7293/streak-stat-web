<template>
    <v-container>
      <v-row dense>
        <v-col
          v-for="(habit, i) in getPickedDateHabitsInfo"
          :key="i"
          cols="6"
        >
          <HabitInfo
            v-bind='habit'
            :pickedDate='pickedDate'
          />
        </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import HabitInfo from '@/components/HabitInfo.vue'
import { mapGetters, mapState } from 'vuex'

export default Vue.extend({
  name: 'SingleDate',
  components: {
    HabitInfo,
  },
  computed: {
    ...mapGetters(['getPickedDateHabitsInfo']),
    ...mapState(['pickedDate']),
  },
  data: () => ({
    getPickedDateDataSample: [
      {
        habitId: 'habitId-1',
        name: 'Weakup',
        description: 'We',
        streakId: 'streakId1',
        start: '2020-02-07',
        streakCount: 5,
      },
      {
        habitId: 'habitId-2',
        name: 'Running',
        description: 'Ru',
        streakId: 'streakId2',
        start: '2020-02-08',
        streakCount: 5,
      },
      {
        habitId: '3',
        name: 'Reading',
        description: 'Re',
      },
    ],
  }),
})
</script>
