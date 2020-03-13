import {
  goalsColl,
} from '@/firebase_backend'
import {
  SettingGoal,
  SettingGoalInArray,
} from '@/store/interface-object'
import { GOAL_DATE_SUBCOLLECTION } from '@/constants'

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
    await goalsColl.doc(goalId)
      .collection(GOAL_DATE_SUBCOLLECTION)
      .doc(date).set({
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
  const addData = {
    name: data.name,
    icon: data.icon,
  }
  goalsColl.add(addData)
}

export const editGoalSetting = async (
  data: SettingGoalInArray,
) => {
  const editData = {
    name: data.name,
    icon: data.icon,
  }
  goalsColl.doc(data.goalId).set(editData)
}

export const deleteGoalSetting = async (
  data: SettingGoalInArray,
) => {
  goalsColl.doc(data.goalId).delete()
}
