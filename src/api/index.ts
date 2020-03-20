import {
  goalsColl,
} from '@/firebase_backend'
import { GOAL_DATE_SUBCOLLECTION } from '@/constants'
import _ from 'lodash'
import goalConverter from '@/firebase_backend/goalConverter'
import datesConverter from
  '@/firebase_backend/datesConverter'

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
    await goalsColl
      .doc(goalId)
      .collection(GOAL_DATE_SUBCOLLECTION)
      .withConverter(datesConverter)
      .doc(date)
      .set({
        doneTime: new Date(),
        goalId,
      })
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
  data: SettingGoalInArray,
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

export const deleteGoalSetting = async (
  data: SettingGoalInArray,
) => {
  goalsColl.doc(data.goalId).delete()
}
