import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getTodayFormat,
} from '@/utils/dateTimeHandle'
import {
  StateType,
  SettingGoal,
  Goal,
  SingleDateGoals,
  SettingGoalInArray,
} from '@/store/interface-object'
import {
  dateCollGroup,
  goalsColl,
} from '@/firebase_backend'
import {
  EDIT_SETTING_DATA,
  DELETE_SETTING_DATA,
  SET_PICKED_DATE,
  SET_GOAL_DATA,
} from './mutation-types'
import ChangeGoals from './helper'

Vue.use(Vuex)

const initState: StateType = {
  pickedDate: getTodayFormat(),
  settingGoals: {},
  goals: [],
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [EDIT_SETTING_DATA](
      state, payload: Record<string, SettingGoal>,
    ) {
      state.settingGoals = {
        ...state.settingGoals,
        ...payload,
      }
    },
    [DELETE_SETTING_DATA](state, payload: string) {
      _.unset(state.settingGoals, payload)
    },
    [SET_GOAL_DATA](state, payload: Array<Goal>) {
      state.goals = payload
    },
  },
  getters: {
    getSettingArray(state): Array<SettingGoalInArray> {
      return Object.keys(state.settingGoals)
        .map(
          goalId => ({
            goalId,
            ...state.settingGoals[goalId],
          }),
        )
    },
    getPickedDateGoals(
      state, getters,
    ): Array<SingleDateGoals> {
      const goalsByDate = state.goals.filter(
        item => item.date === state.pickedDate,
      )
      const settingArray:
        Array<SettingGoalInArray> = getters.getSettingArray
      const result:
        Array<SingleDateGoals> = settingArray.map(
          setting => {
            const goal = goalsByDate.find(
              g => g.goalId === setting.goalId,
            )
            if (!goal) return setting
            const { start, end, streakCount } = goal
            return {
              ...setting,
              start,
              end,
              streakCount,
            }
          },
        )
      return result
    },
  },
  actions: {
    async initGoalSettingListener({ commit }) {
      try {
        goalsColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const data = {
              [doc.id]: {
                ...doc.data(),
              },
            }
            if (change.type === 'added') {
              commit(EDIT_SETTING_DATA, data)
            }
            if (change.type === 'modified') {
              commit(EDIT_SETTING_DATA, data)
            }
            if (change.type === 'removed') {
              commit(DELETE_SETTING_DATA, doc.id)
            }
          })
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    async initDayDataListener({ state, commit }) {
      try {
        dateCollGroup.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const docData = doc.data()
            const { goalId } = docData
            const docChanged = {
              date: doc.id,
              goalId,
            }
            const { goals } = state
            if (change.type === 'added') {
              const newGoals = new ChangeGoals(
                goals, docChanged,
              ).addGoal()
              commit(SET_GOAL_DATA, newGoals)
            }
            if (change.type === 'removed') {
              const newGoals = new ChangeGoals(
                goals, docChanged,
              ).deleteGoal()
              commit(SET_GOAL_DATA, newGoals)
            }
          })
        })
      } catch (error) {
        console.log('error', error)
      }
    },
  },
  modules: {},
})
