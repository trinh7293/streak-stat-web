class DateRecord {
  habitId: string

  doneTime: Date

  constructor(
    habitId: string,
    doneTime: Date,
  ) {
    this.habitId = habitId
    this.doneTime = doneTime
  }
}

// Firestore data converter
export default {
  toFirestore(date: DateRecordType) {
    return {
      habitId: date.habitId,
      doneTime: date.doneTime,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new DateRecord(
      data?.habitId,
      data?.doneTime,
    )
  },
}
