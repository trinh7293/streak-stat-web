import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import { dayColl, goalColl } from '@/firebase_backend'
import { getTodayFormat } from '@/utils/dateTimeHandle'
import {
  DATE,
  ID,
  GOAL_DATA,
} from '@/constants'
import {
  DateData,
  StateInterface,
  GoalSetting,
  FullGoalData,
} from '@/store/interface-object'
import { convertDateData, convertGoalSetting } from '@/store/helper'
import {
  SET_PICKED_DATE,
  SET_DATE_DATAS,
  ADD_DATE_DATA,
  EDIT_DATE_DATA,
  DELETE_DATE_DATA,
  SET_GOAL_SETTINGS,
  ADD_GOAL_SETTINGS,
  EDIT_GOAL_SETTINGS,
  DELETE_GOAL_SETTINGS,
} from './mutation-types'

Vue.use(Vuex)

const initState: StateInterface = {
  pickedDate: getTodayFormat(),
  goalSettings: [],
  dateDatas: [],
}

export default new Vuex.Store({
  state: initState,
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [SET_GOAL_SETTINGS](state, payload: Array<GoalSetting>) {
      state.goalSettings = payload
    },
    [ADD_GOAL_SETTINGS](state, payload: GoalSetting) {
      state.goalSettings.push(payload)
    },
    [EDIT_GOAL_SETTINGS](state, payload: GoalSetting) {
      const index = _.findIndex(state.goalSettings, { [ID]: payload[ID] })
      state.goalSettings.splice(index, 1, payload)
    },
    [DELETE_GOAL_SETTINGS](state, goalId: string) {
      const index = _.findIndex(state.goalSettings, { [ID]: goalId })
      state.goalSettings.splice(index, 1)
    },
    [SET_DATE_DATAS](state, payload: Array<DateData>) {
      state.dateDatas = payload
    },
    [ADD_DATE_DATA](state, payload: DateData) {
      state.dateDatas.push(payload)
    },
    [EDIT_DATE_DATA](state, payload) {
      const index = _.findIndex(state.dateDatas, { [DATE]: payload[DATE] })
      state.dateDatas.splice(index, 1, payload)
    },
    [DELETE_DATE_DATA](state, date) {
      const index = _.findIndex(state.dateDatas, { [DATE]: date })
      state.dateDatas.splice(index, 1)
    },
  },
  getters: {
    getPickedDateData: state => {
      const { pickedDate, dateDatas } = state
      const dd = dateDatas.find(item => item[DATE] === pickedDate)
      return dd
    },
    getPickedDateDataGoals: (state, getters) => {
      const goSe = state.goalSettings
      const dateData = getters.getPickedDateData
      const goSeClone = _.cloneDeep(goSe)
      if (dateData === undefined) {
        return goSeClone
      }
      const goalDataClone = _.cloneDeep(dateData[GOAL_DATA])
      const fullGoalData:
      Array<FullGoalData> = _(goSeClone)
        .keyBy(ID)
        .merge(_.keyBy(goalDataClone, ID))
        .values()
        .value()
      return fullGoalData
    },
  },
  actions: {
    async getListDayData({ commit }) {
      try {
        const querySnapshot = await dayColl.get()
        const dateDatas: Array<DateData> = []
        querySnapshot.forEach(doc => {
          const dt = convertDateData(doc)
          dateDatas.push(dt)
        })
        commit(SET_DATE_DATAS, dateDatas)
      } catch (error) {
        console.log('error', error)
      }
    },
    async initListDayDataListener({ commit }) {
      try {
        dayColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            const { doc } = change
            const dateData: DateData = convertDateData(doc)
            if (change.type === 'added') {
              commit(ADD_DATE_DATA, dateData)
            }
            if (change.type === 'modified') {
              commit(EDIT_DATE_DATA, dateData)
            }
            if (change.type === 'removed') {
              commit(DELETE_DATE_DATA, dateData[DATE])
            }
          })
        })
      } catch (error) {
        console.log('error', error)
      }
    },
    async getSettingGoals({ commit }) {
      try {
        const querySnapshot = await goalColl.get()
        const goalSettings: Array<GoalSetting> = []
        querySnapshot.forEach(doc => {
          const dt = convertGoalSetting(doc)
          goalSettings.push(dt)
        })
        commit(SET_GOAL_SETTINGS, goalSettings)
      } catch (error) {
        console.log('error', error)
      }
    },
    async initSettingGoalListener({ commit }) {
      try {
        goalColl.onSnapshot(snapShot => {
          snapShot.docChanges().forEach(change => {
            console.log('docGoalSettings changed')
            const goalData: GoalSetting = convertGoalSetting(change.doc)
            if (change.type === 'added') {
              commit(ADD_GOAL_SETTINGS, goalData)
            }
            if (change.type === 'modified') {
              commit(EDIT_GOAL_SETTINGS, goalData)
            }
            if (change.type === 'removed') {
              commit(DELETE_GOAL_SETTINGS, change.doc.id)
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
