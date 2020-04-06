import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getTodayFormat, getAdjacentDay,
} from '@/utils/dateTimeHandle'
import {
  firestore,
} from '@/firebase_backend'
import {
  USER_COLLECTION,
  HABITS_COLLECTION,
  HABIT_DATE_SUBCOLLECTION,
} from '@/constants'
import {
  ADD_SETTING_DATA,
  EDIT_SETTING_DATA,
  DELETE_SETTING_DATA,
  SET_PICKED_DATE,
  SET_HABIT_DATA,
  SET_USER,
  SET_IS_AUTHENTICATED,
  RESET_STORE,
  SET_UNSUB_HABITSETTING,
  SET_UNSUB_DAYDATA,
} from './mutation-types'
import ChangeHabits from './helper'

Vue.use(Vuex)

const initState = (): StateType => ({
  pickedDate: getTodayFormat(),
  settingHabits: [],
  habits: [],
  isAuthenticated: false,
  user: null,
  unsubHabitSetting: null,
  unsubDayData: null,
})

export default new Vuex.Store({
  state: initState(),
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [ADD_SETTING_DATA](
      state, payload: SettingHabit,
    ) {
      const index = state.settingHabits.findIndex(
        item => item.habitId === payload.habitId,
      )
      if (index < 0) {
        state.settingHabits.push(payload)
      }
    },
    [EDIT_SETTING_DATA](
      state, payload: SettingHabit,
    ) {
      const index = state.settingHabits.findIndex(
        item => item.habitId === payload.habitId,
      )
      if (index >= 0) {
        state.settingHabits.splice(index, 1, payload)
      }
    },
    [DELETE_SETTING_DATA](state, habitId: string) {
      const index = state.settingHabits.findIndex(
        item => item.habitId === habitId,
      )
      if (index >= 0) {
        state.settingHabits.splice(index, 1)
      }
    },
    [SET_HABIT_DATA](state, payload: Array<Habit>) {
      state.habits = payload
    },
    [SET_USER](state, payload: UserType) {
      const { displayName, uid } = payload
      state.user = {
        displayName,
        uid,
      }
    },
    [SET_IS_AUTHENTICATED](state, payload: boolean) {
      state.isAuthenticated = payload
    },
    [SET_UNSUB_HABITSETTING](state, unsub: () => void) {
      state.unsubHabitSetting = unsub
    },
    [SET_UNSUB_DAYDATA](state, unsub: () => void) {
      state.unsubDayData = unsub
    },
    [RESET_STORE](state) {
      // acquire initial state
      Object.assign(state, initState())
    },
  },
  getters: {
    getUid: (state): string | undefined => {
      const userId = state.user?.uid
      return userId
    },
    getDisplayName: (state): string | undefined => {
      const displayName = state.user?.displayName
      return displayName
    },
    getUserFirebaseDoc: (
      state, getters,
    ): firebase.firestore
    .DocumentReference | null => {
      if (!state.isAuthenticated) return null
      const uid = getters.getUid
      return firestore.collection(USER_COLLECTION)
        .doc(uid)
    },
    getHabitCollection: (
      state, getters,
    ): firebase.firestore
    .CollectionReference | null => {
      if (!state.isAuthenticated) return null
      return getters.getUserFirebaseDoc
        ?.collection(HABITS_COLLECTION)
    },
    getHabitByDate: state => (date: string) => {
      const habitsByDate = state.habits.filter(
        item => item.date === date,
      )
      const result:
        Array<SingleDateHabits> = state.settingHabits.map(
          setting => {
            const habit = habitsByDate.find(
              g => g.habitId === setting.habitId,
            )
            return {
              ...setting,
              start: habit?.start,
              end: habit?.end,
              doneTime: habit?.doneTime,
              streakCount: habit?.streakCount,
            }
          },
        )
      return result
    },
    getPickedDateHabitsInfo(
      state, getters,
    ): Array<SingleDateHabits> {
      const { pickedDate } = state
      const { prevDay } = getAdjacentDay(pickedDate)
      const pickedDateHabits = getters
        .getHabitByDate(pickedDate)
      const prevDateHabits = getters
        .getHabitByDate(prevDay)
      const mergeFunc = (
        todayValue: SingleDateHabits,
        prevValue: SingleDateHabits,
      ): SingleDateHabits => {
        if (prevValue.streakCount) {
          return {
            ...todayValue,
            prevStreakCount: prevValue.streakCount,
          }
        }
        return todayValue
      }
      return _.mergeWith(
        pickedDateHabits,
        prevDateHabits,
        mergeFunc,
      )
    },
    getListStreak: state => (
      habitList: Array<string>,
    ) => {
      const habitNum = habitList.length
      const habitInList: Array<Habit> = state.habits.filter(
        habit => habitList.includes(habit.habitId),
      )
      const listOfStreakTail = Object.values(
        _.groupBy(habitInList, 'date'),
      )
        .filter(date => date.length === habitNum
          && _.some(date, habit => habit
            .end === habit.date))
      const listStreak:
        Array<Streak> = listOfStreakTail.map(
          habitsInSingleDate => {
            const endHabit = habitsInSingleDate.find(
              habit => habit.end === habit.date,
            )
            const smallestStreakHabit = _.minBy(
              habitsInSingleDate, 'streakCount',
            )
            return {
              start: smallestStreakHabit
                ?.start || 'error from',
              end: endHabit?.end || 'error to',
              streakCount: smallestStreakHabit
                ?.streakCount || 0,
            }
          },
        )
      return listStreak
    },
    getBestCompositionStreak: (_state, getter) => (
      habitList: Array<string>,
    ) => {
      const habitNum = habitList.length
      if (habitNum === 1) {
        const habitId = habitList[0]
        const habitStats:
          Array<HabitsStatistic> = getter.getHabitStats
        return habitStats.find(
          sett => sett.habitId === habitId,
        )?.bestStreak || 0
      }
      const listStreak: Array<Streak> = getter
        .getListStreak(habitList)
      return _.maxBy(listStreak, 'streakCount')
        ?.streakCount || 0
    },
    getCurrentCompositionStreak: (state, getter) => (
      habitList: Array<string>,
    ) => {
      const habitNum = habitList.length
      if (habitNum === 1) {
        const habitId = habitList[0]
        const habitStats:
          Array<HabitsStatistic> = getter.getHabitStats
        return habitStats.find(
          sett => sett.habitId === habitId,
        )?.currentStreak || 0
      }
      const today = getTodayFormat()
      const { prevDay } = getAdjacentDay(today)
      const todayHabits = state.habits.filter(
        habit => habit.date === today
          && habitList.includes(habit.habitId),
      )
      const prevdayHabits = state.habits.filter(
        habit => habit.date === prevDay
          && habitList.includes(habit.habitId),
      )
      let todayNum = 0
      let prevdayNum = 0
      if (todayHabits.length === habitNum) {
        todayNum = _.minBy(
          todayHabits, 'streakCount',
        )?.streakCount || 0
      }
      if (prevdayHabits.length === habitNum) {
        prevdayNum = _.minBy(
          prevdayHabits, 'streakCount',
        )?.streakCount || 0
      }
      return todayNum || prevdayNum || 0
    },
    getHabitStats: (state): Array<HabitsStatistic> => {
      const today = getTodayFormat()
      const stats:
        Array<HabitsStatistic> = state.settingHabits
          .map(sett => {
            const { prevDay } = getAdjacentDay(today)
            const prevdayHabit = state.habits.find(
              g => g.habitId === sett.habitId
                && g.date === prevDay,
            )
            const todayHabit = state.habits.find(
              g => g.habitId === sett.habitId
                && g.date === today,
            )
            const maxStreak = _.maxBy(state.habits.filter(
              g => g.habitId === sett.habitId,
            ), 'streakCount')
            return {
              ...sett,
              currentStreak: todayHabit?.streakCount
                || prevdayHabit?.streakCount || 0,
              bestStreak: maxStreak?.streakCount || 0,
            }
          })
      return stats
    },
  },
  actions: {
    async initHabitSettingListener({
      state, commit, getters,
    }) {
      try {
        if (!state.isAuthenticated) {
          throw new Error('user have not logged in')
        }
        const uid: string = getters.getUid
        if (state.unsubHabitSetting) {
          state.unsubHabitSetting()
          console.log('unsubHabitSetting')
        }
        const unsubHabitSetting = firestore
          .collection(USER_COLLECTION)
          .doc(uid)
          .collection(HABITS_COLLECTION)
          .onSnapshot(snapShot => {
            snapShot.docChanges().forEach(change => {
              const { doc } = change
              const payload: SettingHabit = {
                habitId: doc.id,
                name: doc.data().name,
                icon: doc.data().icon,
                iconColor: doc.data().iconColor,
                description: doc.data().description,
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
                commit(DELETE_SETTING_DATA, payload.habitId)
              }
            })
          })
        commit(SET_UNSUB_HABITSETTING, unsubHabitSetting)
      } catch (error) {
        console.log('error in init habit listener: ', error)
      }
    },
    async initDayDataListener({ state, commit, getters }) {
      try {
        if (!state.isAuthenticated) {
          throw new Error('user have not logged in')
        }
        const uid: string = getters.getUid
        if (state.unsubDayData) {
          state.unsubDayData()
          console.log('unsubDayData')
        }
        const unsubDayData = firestore
          .collectionGroup(HABIT_DATE_SUBCOLLECTION)
          .where('uid', '==', uid)
          .onSnapshot(snapShot => {
            snapShot.docChanges().forEach(change => {
              const { doc } = change
              const docData = doc.data()
              const { habitId, doneTime } = docData
              const docChanged = {
                date: doc.id,
                habitId,
                doneTime,
              }
              const { habits } = state
              if (change.type === 'added') {
                const newHabits = new ChangeHabits(
                  habits, docChanged,
                ).addHabit()
                commit(SET_HABIT_DATA, newHabits)
              }
              if (change.type === 'removed') {
                const newHabits = new ChangeHabits(
                  habits, docChanged,
                ).deleteHabit()
                commit(SET_HABIT_DATA, newHabits)
              }
            })
          })
        commit(SET_UNSUB_DAYDATA, unsubDayData)
      } catch (error) {
        console.log('error', error)
      }
    },
    unsubAllListerners({ state }) {
      if (state.unsubHabitSetting) {
        state.unsubHabitSetting()
      }
      if (state.unsubDayData) {
        state.unsubDayData()
      }
      console.log('unsubed all listenners')
    },
    fetchUser({ commit }, user: UserType) {
      if (user) {
        commit(SET_USER, user)
        commit(SET_IS_AUTHENTICATED, true)
      } else {
        commit(RESET_STORE)
      }
    },
  },
  modules: {},
})
