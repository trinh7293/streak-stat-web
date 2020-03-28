import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getTodayFormat, getAdjacentDay,
} from '@/utils/dateTimeHandle'
import {
  dateCollGroup,
  goalsColl,
} from '@/firebase_backend'
import {
  ADD_SETTING_DATA,
  EDIT_SETTING_DATA,
  DELETE_SETTING_DATA,
  SET_PICKED_DATE,
  SET_GOAL_DATA,
} from './mutation-types'
import ChangeGoals from './helper'

Vue.use(Vuex)

const initState: StateType = {
  pickedDate: getTodayFormat(),
  settingGoals: [],
  goals: [],
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [ADD_SETTING_DATA](
      state, payload: SettingGoal,
    ) {
      const index = state.settingGoals.findIndex(
        item => item.goalId === payload.goalId,
      )
      if (index < 0) {
        state.settingGoals.push(payload)
      }
    },
    [EDIT_SETTING_DATA](
      state, payload: SettingGoal,
    ) {
      const index = state.settingGoals.findIndex(
        item => item.goalId === payload.goalId,
      )
      if (index >= 0) {
        state.settingGoals.splice(index, 1, payload)
      }
    },
    [DELETE_SETTING_DATA](state, goalId: string) {
      const index = state.settingGoals.findIndex(
        item => item.goalId === goalId,
      )
      if (index >= 0) {
        state.settingGoals.splice(index, 1)
      }
    },
    [SET_GOAL_DATA](state, payload: Array<Goal>) {
      state.goals = payload
    },
  },
  getters: {
    getGoalByDate: state => (date: string) => {
      const goalsByDate = state.goals.filter(
        item => item.date === date,
      )
      const result:
        Array<SingleDateGoals> = state.settingGoals.map(
          setting => {
            const goal = goalsByDate.find(
              g => g.goalId === setting.goalId,
            )
            return {
              ...setting,
              start: goal?.start,
              end: goal?.end,
              doneTime: goal?.doneTime,
              streakCount: goal?.streakCount,
            }
          },
        )
      return result
    },
    getPickedDateGoalsInfo(
      state, getters,
    ): Array<SingleDateGoals> {
      const { pickedDate } = state
      const { prevDay } = getAdjacentDay(pickedDate)
      const pickedDateGoals = getters
        .getGoalByDate(pickedDate)
      const prevDateGoals = getters
        .getGoalByDate(prevDay)
      const mergeFunc = (
        todayValue: SingleDateGoals,
        prevValue: SingleDateGoals,
      ): SingleDateGoals => {
        if (prevValue.streakCount) {
          return {
            ...todayValue,
            prevStreakCount: prevValue.streakCount,
          }
        }
        return todayValue
      }
      return _.mergeWith(
        pickedDateGoals,
        prevDateGoals,
        mergeFunc,
      )
    },
    getListStreak: state => (
      goalList: Array<string>,
    ) => {
      const goalNum = goalList.length
      const goalInList: Array<Goal> = state.goals.filter(
        goal => goalList.includes(goal.goalId),
      )
      const listOfStreakTail = Object.values(
        _.groupBy(goalInList, 'date'),
      )
        .filter(date => date.length === goalNum
          && _.some(date, goal => goal
            .end === goal.date))
      const listStreak:
        Array<Streak> = listOfStreakTail.map(
          goalsInSingleDate => {
            const endGoal = goalsInSingleDate.find(
              goal => goal.end === goal.date,
            )
            const smallestStreakGoal = _.minBy(
              goalsInSingleDate, 'streakCount',
            )
            return {
              start: smallestStreakGoal
                ?.start || 'error from',
              end: endGoal?.end || 'error to',
              streakCount: smallestStreakGoal
                ?.streakCount || 0,
            }
          },
        )
      return listStreak
    },
    getBestCompositionStreak: (_state, getter) => (
      goalList: Array<string>,
    ) => {
      const goalNum = goalList.length
      if (goalNum === 1) {
        const goalId = goalList[0]
        const goalStats:
          Array<GoalsStatistic> = getter.getGoalStats
        return goalStats.find(
          sett => sett.goalId === goalId,
        )?.bestStreak || 0
      }
      const listStreak: Array<Streak> = getter
        .getListStreak(goalList)
      return _.maxBy(listStreak, 'streakCount')
        ?.streakCount || 0
    },
    getCurrentCompositionStreak: (state, getter) => (
      goalList: Array<string>,
    ) => {
      const goalNum = goalList.length
      if (goalNum === 1) {
        const goalId = goalList[0]
        const goalStats:
          Array<GoalsStatistic> = getter.getGoalStats
        return goalStats.find(
          sett => sett.goalId === goalId,
        )?.currentStreak || 0
      }
      const today = getTodayFormat()
      const todayGoals = state.goals.filter(
        goal => goal.date === today
          && goalList.includes(goal.goalId),
      )
      if (todayGoals.length < goalNum) {
        return 0
      }
      return _.minBy(
        todayGoals, 'streakCount',
      )?.streakCount || 0
    },
    getGoalStats: state => {
      const today = getTodayFormat()
      const stats:
        Array<GoalsStatistic> = state.settingGoals
          .map(sett => {
            const todayGoal = state.goals.find(
              g => g.goalId === sett.goalId
                && g.date === today,
            )
            const maxStreak = _.maxBy(state.goals.filter(
              g => g.goalId === sett.goalId,
            ), 'streakCount')
            return {
              ...sett,
              currentStreak: todayGoal?.streakCount || 0,
              bestStreak: maxStreak?.streakCount || 0,
            }
          })
      return stats
    },
  },
  actions: {
    async initGoalSettingListener({ commit }) {
      try {
        goalsColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const { name, icon, description } = doc.data()
            const payload: SettingGoal = {
              goalId: doc.id,
              name,
              icon,
              description,
            }
            if (change.type === 'added') {
              commit(ADD_SETTING_DATA, payload)
            }
            if (change.type === 'modified') {
              commit(EDIT_SETTING_DATA, payload)
            }
            if (change.type === 'removed') {
              console.log(
                'commit remove setting: ',
                payload,
              )
              commit(DELETE_SETTING_DATA, payload.goalId)
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
            const { goalId, doneTime } = docData
            const docChanged = {
              date: doc.id,
              goalId,
              doneTime,
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
