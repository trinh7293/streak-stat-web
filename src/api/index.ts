import {
  functions, auth, firestore,
} from '@/firebase_backend'
import {
  HABIT_DATE_SUBCOLLECTION,
  HABITS_COLLECTION,
  USER_COLLECTION,
} from '@/constants'
import _ from 'lodash'
import habitConverter from
  '@/firebase_backend/habitConverter'
import { getTodayFormat } from '@/utils/dateTimeHandle'
import store from '@/store'
import userConverter from '@/firebase_backend/userConverter'

const habitsColl = () => store.getters.getHabitCollection
const userDoc = ():
  firebase.firestore
  .DocumentReference => store.getters.getUserFirebaseDoc
const uid = () => store.getters.getUid
const checkAuthenticated = () => {
  if (!store.state.isAuthenticated) {
    throw new Error('user have not logged in')
  }
}

export const deleteHabit = async (
  date: string, habitId: string,
) => {
  try {
    checkAuthenticated()
    await habitsColl().doc(habitId)
      .collection(HABIT_DATE_SUBCOLLECTION)
      .doc(date)
      .delete()
    console.log('successfully delete habit: ', habitId)
  } catch (error) {
    console.log('error in delete habit: ', error)
  }
}

export const addHabit = async (
  date: string, habitId: string,
) => {
  try {
    checkAuthenticated()
    const addObj: DateRecordType = {
      uid: uid(),
      habitId,
    }
    if (getTodayFormat() === date) {
      addObj.doneTime = new Date()
    }
    await habitsColl()
      .doc(habitId)
      .collection(HABIT_DATE_SUBCOLLECTION)
      // .withConverter(datesConverter)
      .doc(date)
      .set(addObj)
    console.log(
      'successfully add habit: ',
      date,
      habitId,
    )
  } catch (error) {
    console.log('error in add habit: ', error)
  }
}

export const addHabitSetting = async (
  data: SettingHabit,
) => {
  const addData = _.pick(
    data,
    'name',
    'description',
    'icon',
  )
  try {
    checkAuthenticated()
    habitsColl().withConverter(habitConverter).add(addData)
  } catch (error) {
    console.log('error in add setting: ', error)
  }
}

export const editHabitSetting = async (
  data: SettingHabit,
) => {
  const editData = _.pick(
    data,
    'name',
    'description',
    'icon',
  )
  try {
    checkAuthenticated()
    habitsColl().withConverter(habitConverter)
      .doc(data.habitId).set(editData)
  } catch (error) {
    console.log('error in edit setting: ', error)
  }
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

export const deleteHabitSetting = async (
  habitId: string,
) => {
  // habitsColl().doc(data.habitId).delete()
  try {
    checkAuthenticated()
    deleteAtPath(`/
      ${USER_COLLECTION}/
      ${uid()}/
      ${HABITS_COLLECTION}/
      ${habitId}
    `)
  } catch (error) {
    console.log('error in delete setting: ', error)
  }
}

export const userLogin = async (
  email: string, password: string,
) => {
  await auth
    .signInWithEmailAndPassword(email, password)
}

export const userJoin = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const data = await auth
    .createUserWithEmailAndPassword(email, password)
  const { user } = data
  await user?.updateProfile({
    displayName,
  })
  store.dispatch('fetchUser', user)
  // TODO test
  await userDoc().withConverter(userConverter).set({
    email,
    displayName,
  })
}

export const userSignOut = async () => {
  await auth.signOut()
}

// export const importData = async () => {
//   console.log('start import')
//   const habitQuery = await firestore
//     .collection('goals').get()
//   habitQuery.forEach(async habitDoc => {
//     const { id: habitId } = habitDoc
//     const habitData = habitDoc.data()
//     habitsColl().doc(habitId).set(habitData)
//     const dateQuery = await firestore
//       .collection('goals')
//       .doc(habitId)
//       .collection(HABIT_DATE_SUBCOLLECTION)
//       .get()
//     dateQuery.forEach(dateDoc => {
//       const { id: dateId } = dateDoc
//       const dateData = dateDoc.data()
//       const { doneTime } = dateData
//       const setDate: DateRecordType = {
//         uid: uid(),
//         habitId,
//       }
//       if (doneTime) {
//         console.log('doneTime: ', doneTime)
//         setDate.doneTime = doneTime
//       }
//       habitsColl().doc(habitId)
//         .collection(HABIT_DATE_SUBCOLLECTION)
//         .doc(dateId)
//         .set(setDate)
//     })
//   })
// }
