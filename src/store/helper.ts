import _ from 'lodash'

import {
  DATE,
  GOAL_DATA,
  NAME,
  ICON,
  ID,
} from '@/constants'
import {
  DateData,
  GoalSetting,
} from './interface-object'

export const convertDateData = (dateDataDoc: firebase.firestore.QueryDocumentSnapshot):
  DateData => {
  const goalDataObj = dateDataDoc.data()
  const goalData = _.map(goalDataObj, (value, key) => ({
    [ID]: key,
    ...value,
  }))
  const dayData = {
    [DATE]: dateDataDoc.id,
    [GOAL_DATA]: goalData,
  }
  return dayData
}

export const convertGoalSetting = (doc: firebase.firestore.QueryDocumentSnapshot): GoalSetting => {
  const data = doc.data()
  const result: GoalSetting = {
    [ID]: doc.id,
    [NAME]: data[NAME],
    [ICON]: data[ICON],
  }
  return result
}
