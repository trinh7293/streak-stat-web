import {
  goalStreakColl, goalSettingColl,
} from '@/firebase_backend'
import { getAdjacentDay } from '@/utils/dateTimeHandle'
import store from '@/store'
import {
  StreakGoal,
  SettingGoal,
} from '@/store/interface-object'

export const deleteStreak = async (
  pickedDate: string,
  streakId: string,
) => {
  try {
    const streak: StreakGoal | undefined = store
      .getters.getStreakById(streakId)
    if (!streak) {
      throw new Error(
        'deleteStreak: Document does not exist!',
      )
    }
    const { nextDay, prevDay } = getAdjacentDay(pickedDate)
    const { start, end } = streak
    const streakRef = goalStreakColl.doc(streakId)
    if (start === end) {
      await streakRef.delete()
    } else if (pickedDate === start) {
      await streakRef.update({ start: nextDay })
    } else if (pickedDate === end) {
      await streakRef.update({ end: prevDay })
    } else {
      await streakRef.update({ end: prevDay })
      const newStreak = {
        goalSettingId: streak.goalSettingId,
        start: nextDay,
        end,
      }
      await goalStreakColl.add(newStreak)
    }
  } catch (error) {
    console.log('deleteStreak failed: ', error)
  }
}


export const addStreak = async (
  pickedDate: string,
  goalSettingId: string,
) => {
  const {
    prevStreak,
    nextStreak,
  } = store.getters
    .getAdjacentSreaks(pickedDate, goalSettingId)
  if (prevStreak && nextStreak) {
    const prevRef = goalStreakColl.doc(prevStreak.id)
    const nextRef = goalStreakColl.doc(nextStreak.id)
    await prevRef.update({ end: nextStreak.end })
    await nextRef.delete()
  } else if (prevStreak) {
    const prevRef = goalStreakColl.doc(prevStreak.id)
    await prevRef.update({ end: pickedDate })
  } else if (nextStreak) {
    const nextRef = goalStreakColl.doc(nextStreak.id)
    await nextRef.update({ start: pickedDate })
  } else {
    const newStreak = {
      goalSettingId,
      start: pickedDate,
      end: pickedDate,
    }
    await goalStreakColl.add(newStreak)
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
  data: SettingGoal,
) => {
  const editData = {
    name: data.name,
    icon: data.icon,
  }
  goalSettingColl.doc(data.id).set(editData)
}

export const deleteGoalSetting = async (
  data: SettingGoal,
) => {
  goalSettingColl.doc(data.id).delete()
}
