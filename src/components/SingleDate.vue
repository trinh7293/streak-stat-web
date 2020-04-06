<template>
    <v-container>
    <v-list
      flat
      max-width="400"
      v-for="(item, i) in habits"
      :key="i"
    >
      <HabitInfo
        v-bind='item'
        :pickedDate='pickedDate'
      />
    </v-list>
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
    ...mapGetters({
      habits: 'getPickedDateHabitsInfo',
    }),
    ...mapState(['pickedDate']),
  },
})
</script>
