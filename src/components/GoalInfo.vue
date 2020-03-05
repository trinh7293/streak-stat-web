<template>
  <main>
    <v-layout row wrap>
      <v-flex xs6 class='text-xs-left'>
        <v-btn class='mx-2' fab dark small
          v-bind:color='sttColor'
          v-on:click='toggleStt'>
            <v-icon class='caption'>{{goalStr}}</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-show="streakId" xs1>
        <v-label color="green">{{streakCount}}</v-label>
      </v-flex>
      <!-- <v-flex v-show="streakId" xs3>
        {{start}}
      </v-flex> -->
      <v-flex xs5></v-flex>
    </v-layout>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  deleteStreak,
  addStreak,
} from '@/api'

export default Vue.extend({
  name: 'GoalInfo',
  methods: {
    toggleStt() {
      if (this.streakId) {
        deleteStreak(this.pickedDate, this.streakId)
      } else {
        addStreak(this.pickedDate, this.settingId)
      }
    },
  },
  computed: {
    sttColor(): string {
      return this.streakCount > 0 ? 'green' : 'red'
    },
    goalStr(): string {
      return this.icon
    },
  },
  props: {
    pickedDate: {
      type: String,
      required: true,
    },
    settingId: {
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
    streakId: {
      type: String,
      default: null,
    },
    start: {
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
