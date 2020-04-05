<template>
  <v-list-item
    @click="toggleStt"
  >
    <v-list-item-icon>
      <v-icon v-text="icon"></v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="name"
      ></v-list-item-title>
      <v-list-item-subtitle>
        {{streakString}}
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-checkbox
        :value="isDone"
        :readonly="true"
      />
    </v-list-item-action>
  </v-list-item>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  deleteHabit,
  addHabit,
} from '@/api'

export default Vue.extend({
  name: 'HabitInfo',
  methods: {
    toggleStt() {
      if (this.streakCount) {
        deleteHabit(this.pickedDate, this.habitId)
      } else {
        addHabit(this.pickedDate, this.habitId)
      }
    },
  },
  computed: {
    sttColor(): string {
      if (this.streakCount < 1) {
        return 'red'
      }
      if (this.streakCount < 3) {
        return '#1bae16'
      }
      return '#1bae16'
    },
    streakNum(): number {
      return this.streakCount
        || this.prevStreakCount || 0
    },
    streakString(): string {
      return `Current Streak: ${this.streakNum}`
    },
    isDone(): boolean {
      return !!this.streakCount
    },
  },
  props: {
    pickedDate: {
      type: String,
      required: true,
    },
    habitId: {
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
    prevStreakCount: {
      type: Number,
      default: 0,
    },
  },
})
</script>
