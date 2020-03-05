import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getTodayFormat,
  getAdjacentDay,
} from '@/utils/dateTimeHandle'
import {
  goalSettingColl,
  goalStreakColl,
} from '@/firebase_backend'
import {
  StateType,
  SettingGoal,
  StreakGoal,
  SingleDateGoal,
} from '@/store/interface-object'
import {
  ADD_SETTING_DATA,
  EDIT_SETTING_DATA,
  DELETE_SETTING_DATA,
  ADD_STREAK_DATA,
  EDIT_STREAK_DATA,
  DELETE_STREAK_DATA,
  SET_PICKED_DATE,
} from '@/store/mutation-types'
import moment from 'moment'

Vue.use(Vuex)

const initState: StateType = {
  pickedDate: getTodayFormat(),
  settingGoals: [],
  streakGoals: [],
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [ADD_SETTING_DATA](state, payload: SettingGoal) {
      const index = _.findIndex(
        state.settingGoals, { id: payload.id },
      )
      if (index === -1) {
        state.settingGoals.push(payload)
      } else {
        console.log('goalSetting is exist')
        console.table(payload)
      }
    },
    [EDIT_SETTING_DATA](state, payload: SettingGoal) {
      const index = _.findIndex(
        state.settingGoals, { id: payload.id },
      )
      state.settingGoals.splice(index, 1, payload)
    },
    [DELETE_SETTING_DATA](state, payload: string) {
      const index = _.findIndex(
        state.settingGoals, { id: payload },
      )
      state.settingGoals.splice(index, 1)
    },
    [ADD_STREAK_DATA](state, payload: StreakGoal) {
      const index = _.findIndex(
        state.streakGoals, { id: payload.id },
      )
      if (index === -1) {
        state.streakGoals.push(payload)
      } else {
        console.log('goalStreak is exist')
        console.table(payload)
      }
    },
    [EDIT_STREAK_DATA](state, payload: StreakGoal) {
      const index = _.findIndex(
        state.streakGoals, { id: payload.id },
      )
      state.streakGoals.splice(index, 1, payload)
    },
    [DELETE_STREAK_DATA](state, payload: string) {
      const index = _.findIndex(
        state.streakGoals, { id: payload },
      )
      state.streakGoals.splice(index, 1)
    },
  },
  getters: {
    getStreakBelong: state => (
      date: string,
    ) => state.streakGoals
      .find(item => moment(date).isBetween(
        moment(item.start),
        moment(item.end),
        undefined,
        '[]',
      )),
    getStreakById: state => (
      streakId: string,
    ) => state.streakGoals
      .find(item => item.id === streakId),
    getAdjacentSreaks: state => (
      date: string,
      goalSettingId: string,
    ) => {
      const { nextDay, prevDay } = getAdjacentDay(date)
      const nextStreak = state.streakGoals.find(
        item => item.goalSettingId === goalSettingId
          && item.start === nextDay,
      )
      const prevStreak = state.streakGoals.find(
        item => item.goalSettingId === goalSettingId
          && item.end === prevDay,
      )
      return {
        nextStreak,
        prevStreak,
      }
    },
    // state.streakGoals
    //   .find(item => moment(date).isBetween(
    //     moment(item.start),
    //     moment(item.end),
    //     undefined,
    //     '[]',
    //   )),
    getStreakListInPickedDate: (
      state,
    ): Array<StreakGoal> => {
      const pickedDate = moment(state.pickedDate)
      const streaksFit = state.streakGoals.reduce(
        (acc: Array<StreakGoal>, cur: StreakGoal) => {
          const start = moment(cur.start)
          const end = moment(cur.end)
          if (pickedDate.isBetween(
            start,
            end,
            undefined,
            '[]',
          )) {
            acc.push(cur)
          }
          return acc
        }, [],
      )
      return streaksFit
    },
    getSingleDateGoal: (
      state, getters,
    ): Array<SingleDateGoal> => {
      const streaksFit: Array<StreakGoal> = getters
        .getStreakListInPickedDate
      const result = state.settingGoals.map(setting => {
        let settingMod: SingleDateGoal = {
          ..._.omit(setting, 'id'),
          settingId: setting.id,
        }
        const streak = streaksFit.find(
          stre => stre.goalSettingId === setting.id,
        )
        if (streak) {
          const streakCount = moment(state.pickedDate)
            .diff(moment(streak.start), 'day') + 1
          settingMod = {
            ...settingMod,
            streakId: streak.id,
            start: streak.start,
            streakCount,
          }
        }
        return settingMod
      })
      return result
    },
  },
  actions: {
    async initGoalSettingListener({ commit }) {
      try {
        goalSettingColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const data = {
              id: doc.id,
              ...doc.data(),
            }
            if (change.type === 'added') {
              commit(ADD_SETTING_DATA, data)
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
    async initGoalStreakListener({ commit }) {
      try {
        goalStreakColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const data = {
              id: doc.id,
              ...doc.data(),
            }
            if (change.type === 'added') {
              commit(ADD_STREAK_DATA, data)
            }
            if (change.type === 'modified') {
              commit(EDIT_STREAK_DATA, data)
            }
            if (change.type === 'removed') {
              commit(DELETE_STREAK_DATA, doc.id)
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
