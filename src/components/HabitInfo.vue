<template>
  <v-list-item
    @click="toggleStt"
  >
    <v-list-item-icon>
      <v-icon
        :color="iconColorStr"
        v-text="icon"></v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title
        v-text="name"
      ></v-list-item-title>
      <v-list-item-subtitle>
        Current Streak: <span
          :class="{goodStreak: checkGoodStreak}"
          >
          {{streakString}}
        </span>
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
    streakNum(): number {
      return this.streakCount
        || this.prevStreakCount || 0
    },
    streakString(): string {
      return `${this.streakNum}`
    },
    isDone(): boolean {
      return !!this.streakCount
    },
    checkGoodStreak(): boolean {
      return this.streakNum >= 3
    },
    iconColorStr(): string {
      return this.isDone
        ? this.iconColor
        : ''
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
    iconColor: {
      type: String,
      default: '',
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

<style>
.goodStreak {
  color: green;
}
</style>
