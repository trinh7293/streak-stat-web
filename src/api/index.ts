import {
  goalSettingColl,
  goalsColl,
} from '@/firebase_backend'
import {
  SettingGoal,
  SettingGoalInArray,
} from '@/store/interface-object'

export const deleteGoal = async (goalId: string) => {
  try {
    await goalsColl.doc(goalId).delete()
    console.log('successfully delete goal: ', goalId)
  } catch (error) {
    console.log('error in delete goal: ', error)
  }
}

export const addGoal = async (
  date: string, settingId: string,
) => {
  try {
    await goalsColl.add({
      date,
      settingId,
    })
    console.log(
      'successfully add goal: ',
      date,
      settingId,
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
  goalSettingColl.add(addData)
}

export const editGoalSetting = async (
  data: SettingGoalInArray,
) => {
  const editData = {
    name: data.name,
    icon: data.icon,
  }
  goalSettingColl.doc(data.settingId).set(editData)
}

export const deleteGoalSetting = async (
  data: SettingGoalInArray,
) => {
  goalSettingColl.doc(data.settingId).delete()
}
