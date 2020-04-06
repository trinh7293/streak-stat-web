<template>
  <div
    class="d-flex justify-space-around"
  >
    <v-icon
      class='iconAdjust'
      @click="setPrevDay"
    >
      mdi-chevron-left
    </v-icon>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="Date"
          prepend-icon="mdi-calendar"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="menu = false" />
    </v-menu>
    <v-icon
      class='iconAdjust'
      @click="setNextDay"
    >
      mdi-chevron-right
    </v-icon>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'
import { SET_PICKED_DATE } from '@/store/mutation-types'
import { getAdjacentDay } from '@/utils/dateTimeHandle'

export default Vue.extend({
  data: () => ({
    menu: false,
  }),
  methods: {
    setPrevDay() {
      const { prevDay } = getAdjacentDay(this.pickedDate)
      this.$store.commit(SET_PICKED_DATE, prevDay)
    },
    setNextDay() {
      const { nextDay } = getAdjacentDay(this.pickedDate)
      this.$store.commit(SET_PICKED_DATE, nextDay)
    },
  },
  computed: {
    ...mapState(['pickedDate']),
    date: {
      get() {
        return this.pickedDate
      },
      set(value) {
        this.$store.commit(SET_PICKED_DATE, value)
      },
    },
  },
})
</script>

<style scoped>
.iconAdjust {
  font-size: 36px;
  margin: 0px 22px;
}
</style>
