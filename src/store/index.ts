import Vue from 'vue'
import Vuex from 'vuex'
import { firestore } from '@/database'
import getTodayFormat from '@/utils/dateTimeHandle'
import {
  COLLECTION_DAY_DATA, WEAKING_UP_EARLY, RUNNING, READING,
} from '@/constants'
import { DateData } from '@/store/interface-object'

import { SET_PICKED_DATE, SET_DATE_DATA, SET_DATE_DATA_UNSUBSCRIBE } from './mutation-types'

const dayColl = firestore.collection(COLLECTION_DAY_DATA)

Vue.use(Vuex)

const initDateData: DateData = {
  [WEAKING_UP_EARLY]: false,
  [RUNNING]: false,
  [READING]: false,
}

const unsubcribe = () => {
  console.warn('there are no subscription')
}

export default new Vuex.Store({
  state: {
    pickedDate: getTodayFormat(),
    dateData: {
      [WEAKING_UP_EARLY]: false,
      [RUNNING]: false,
      [READING]: false,
    },
    dateDataUnsubscribe: unsubcribe,
  },
  mutations: {
    [SET_PICKED_DATE](state, dateFormat) {
      state.pickedDate = dateFormat
    },
    [SET_DATE_DATA](state, payload) {
      state.dateData = payload
    },
    [SET_DATE_DATA_UNSUBSCRIBE](state, payload) {
      state.dateDataUnsubscribe = payload
    },
  },
  getters: {},
  actions: {
    initPickedDayDataListener({ commit, state }) {
      const dateDataUnsubscribe = dayColl.doc(state.pickedDate).onSnapshot(doc => {
        const dataSnapshot = doc.data()
        if (dataSnapshot) {
          commit(SET_DATE_DATA, dataSnapshot)
        } else {
          commit(SET_DATE_DATA, initDateData)
        }
      })
      commit(SET_DATE_DATA_UNSUBSCRIBE, dateDataUnsubscribe)
    },
    setPickedDate({ state, commit, dispatch }, payload) {
      // const unsubcribe = state.dateDataUnsubscribe
      state.dateDataUnsubscribe()
      commit(SET_PICKED_DATE, payload)
      dispatch('initPickedDayDataListener')
    },
  },
  modules: {},
})
