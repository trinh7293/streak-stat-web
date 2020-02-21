import { firestore } from '@/database'
import getTodayFormat from '@/utils/dateTimeHandle'
import { COLLECTION_DAY_DATA } from '@/constants'

const dayColl = firestore.collection(COLLECTION_DAY_DATA)

const editDateData = (pickedDay: string, data: {}) => {
  const today = getTodayFormat()
  const day = pickedDay || today
  dayColl.doc(day).set(data, {
    merge: true,
  })
}

export default editDateData
