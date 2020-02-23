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
      <v-flex xs1 class='text-xs-left'>
        {{streak_num}}
      </v-flex>
      <v-flex xs5></v-flex>
    </v-layout>
  </main>
</template>

<script lang='ts'>
import Vue from 'vue'
// import { addEditDateData } from '@/api'
import {
  addEditDateData,
} from '@/api'
import {
  ID,
  NAME,
  ICON,
  START_STREAK,
  STREAK_NUM,
  IS_END_STREAK,
} from '@/constants'
import { GoalData } from '../store/interface-object'

export default Vue.extend({
  name: 'GoalInfo',
  methods: {
    toggleStt() {
      const goalDataEdit: GoalData = {
        [ID]: this.id,
        [START_STREAK]: this.start_streak,
        [STREAK_NUM]: Number(!this.streak_num),
        [IS_END_STREAK]: this.is_end_streak,
      }
      addEditDateData(this.pickedDate, goalDataEdit)
    },
  },
  computed: {
    sttColor(): string {
      return this[STREAK_NUM] > 0 ? 'green' : 'red'
    },
    goalStr(): string {
      return this[ICON]
    },
  },
  props: {
    pickedDate: {
      type: String,
      required: true,
    },
    [ID]: {
      type: String,
      required: true,
    },
    [NAME]: {
      type: String,
      required: true,
    },
    [ICON]: {
      type: String,
      required: true,
    },
    [START_STREAK]: {
      type: String,
      default: '',
    },
    [STREAK_NUM]: {
      type: Number,
      default: 0,
    },
    [IS_END_STREAK]: {
      type: Boolean,
      default: false,
    },
  },
})
</script>
