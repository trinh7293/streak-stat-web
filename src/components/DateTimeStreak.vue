<template>
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
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'
import { SET_PICKED_DATE } from '@/store/mutation-types'

export default Vue.extend({
  data: () => ({
    menu: false,
  }),
  computed: {
    ...mapState(['pickedDate']),
    date: {
      get() {
        return this.$store.state.pickedDate
      },
      set(value) {
        this.$store.commit(SET_PICKED_DATE, value)
      },
    },
  },
})
</script>
