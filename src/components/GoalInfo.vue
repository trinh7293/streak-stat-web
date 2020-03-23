<template>
  <v-card
    :color="sttColor"
    dark
    @click='toggleStt'
  >
    <div class="d-flex flex-no-wrap justify-space-between">
      <div class="d-flex flex-no-wrap justify-start">
        <v-icon dark>{{icon}}</v-icon>
        <div>
          <v-card-title
            class="headline"
            v-text="name"
          ></v-card-title>

          <v-card-subtitle
            v-text="streakString"
          />
        </div>
      </div>
      <v-icon v-if="streakCount" large>mdi-check</v-icon>
    </div>
  </v-card>
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
    streakString(): string {
      return `Current Streak: ${this.streakCount}`
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
    doneTime: {
      type: Date,
      default: null,
    },
    streakCount: {
      type: Number,
      default: 0,
    },
  },
})
</script>
