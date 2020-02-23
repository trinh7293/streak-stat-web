import { goalColl, functions, dayColl } from '@/firebase_backend'
import {
  GoalSetting,
  GoalData,
} from '@/store/interface-object'
import {
  NAME,
  ICON,
  ID,
  START_STREAK,
  STREAK_NUM,
  IS_END_STREAK,
} from '@/constants'
import axios from 'axios'
import store from '@/store'
// export const addEditDateData = (pickedDate: string, goalData: GoalData) => {
//   axios.post
// }

const domain = ' https://us-central1-streak-stat.cloudfunctions.net/'
const getApiUrl = (endPoint: string) => `${domain}${endPoint}`

export const testHello = async () => {
  axios.post(getApiUrl('helloWorld'), {
    name: 'Jane',
  }).then(res => res.data)
}

export const addEditDateData = async (pickedDate: string, goalDataSend: GoalData) => {
  // const editData = {
  //   pickedDate,
  //   ...goalDataSend,
  // }
  const editData = {
    [goalDataSend.id]: {
      [START_STREAK]: goalDataSend[START_STREAK],
      [STREAK_NUM]: goalDataSend[STREAK_NUM],
      [IS_END_STREAK]: goalDataSend[IS_END_STREAK],
    },
  }
  dayColl.doc(pickedDate).set(editData, {
    merge: true,
  })
  // axios.post(getApiUrl('editGoalData'), ededitGoalDataitData).then(res => res.data)
}

export const addGoalSetting = async (data: GoalSetting) => {
  const addData = {
    [NAME]: data[NAME],
    [ICON]: data[ICON],
  }
  goalColl.add(addData)
}

export const editGoalSetting = async (data: GoalSetting) => {
  const editData = {
    [NAME]: data[NAME],
    [ICON]: data[ICON],
  }
  goalColl.doc(data[ID]).set(editData)
}

export const testCall = (messageText: string) => {
  const addMessage = functions.httpsCallable('addMessage')
  addMessage({ text: messageText }).then(result => {
    // Read result of the Cloud Function.
    const sanitizedMessage = result.data.text
    console.log(sanitizedMessage)
    // ...
  })
}
