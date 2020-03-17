<template>
  <main>
    <v-layout row wrap>
      <v-flex xs6 class='text-xs-left'>
        <v-btn class='mx-2' fab dark small
          v-bind:color='sttColor'
          v-on:click='toggleStt'>
            <v-icon class='caption'>{{name}}</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-show="goalId" xs1>
        <v-label color="green">{{streakCount}}</v-label>
      </v-flex>
      <v-flex xs5></v-flex>
    </v-layout>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  deleteGoal,
  addGoal,
} from '@/api'

export default Vue.extend({
  name: 'GoalInfo',
  methods: {
    toggleStt() {
      if (this.streakCount) {
        deleteGoal(this.pickedDate, this.goalId)
      } else {
        addGoal(this.pickedDate, this.goalId)
      }
    },
  },
  computed: {
    sttColor(): string {
      return this.streakCount > 0 ? 'green' : 'red'
    },
  },
  props: {
    pickedDate: {
      type: String,
      required: true,
    },
    goalId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      default: null,
    },
    end: {
      type: String,
      default: null,
    },
    streakCount: {
      type: Number,
      default: null,
    },
  },
})
</script>
