<template>
  <v-row justify='center'>
    <v-date-picker v-model='pickedDate'></v-date-picker>
  </v-row>
</template>

<script lang='ts'>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState(['pickedDate']),
    pickedDate: {
      get() {
        return this.$store.state.pickedDate
      },
      set(value) {
        this.$store.dispatch('setPickedDate', value)
      },
    },
  },
})
</script>
