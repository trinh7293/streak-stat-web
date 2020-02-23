import { firestore, functions } from '@/database'
import getTodayFormat from '@/utils/dateTimeHandle'
import { COLLECTION_DAY_DATA } from '@/constants'

const dayColl = firestore.collection(COLLECTION_DAY_DATA)

export const editDateData = (pickedDay: string, data: {}) => {
  const today = getTodayFormat()
  const day = pickedDay || today
  dayColl.doc(day).set(data, {
    merge: true,
  })
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
