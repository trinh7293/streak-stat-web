import {
  goalsColl, functions,
} from '@/firebase_backend'
import {
  GOAL_DATE_SUBCOLLECTION,
  GOALS_COLLECTION,
} from '@/constants'
import _ from 'lodash'
import goalConverter from '@/firebase_backend/goalConverter'
import { getTodayFormat } from '@/utils/dateTimeHandle'

export const deleteGoal = async (
  date: string, goalId: string,
) => {
  try {
    await goalsColl.doc(goalId)
      .collection(GOAL_DATE_SUBCOLLECTION)
      .doc(date)
      .delete()
    console.log('successfully delete goal: ', goalId)
  } catch (error) {
    console.log('error in delete goal: ', error)
  }
}

export const addGoal = async (
  date: string, goalId: string,
) => {
  try {
    const addObj: DateRecordType = {
      goalId,
    }
    if (getTodayFormat() === date) {
      addObj.doneTime = new Date()
    }
    await goalsColl
      .doc(goalId)
      .collection(GOAL_DATE_SUBCOLLECTION)
      // .withConverter(datesConverter)
      .doc(date)
      .set(addObj)
    console.log(
      'successfully add goal: ',
      date,
      goalId,
    )
  } catch (error) {
    console.log('error in add goal: ', error)
  }
}

export const addGoalSetting = async (data: SettingGoal) => {
  const addData = _.pick(
    data,
    'name',
    'description',
    'icon',
  )
  goalsColl.withConverter(goalConverter).add(addData)
}

export const editGoalSetting = async (
  data: SettingGoal,
) => {
  const editData = _.pick(
    data,
    'name',
    'description',
    'icon',
  )
  goalsColl.withConverter(goalConverter)
    .doc(data.goalId).set(editData)
}


const deleteAtPath = async (path: string) => {
  try {
    const deleteFn = await functions
      .httpsCallable('recursiveDelete')
    const result = await deleteFn({ path })
    console.log(`Delete success: ${JSON.stringify(result)}`)
  } catch (error) {
    console.warn(error)
  }
}

export const deleteGoalSetting = async (
  data: SettingGoal,
) => {
  // goalsColl.doc(data.goalId).delete()
  deleteAtPath(`/${GOALS_COLLECTION}/${data.goalId}`)
}
