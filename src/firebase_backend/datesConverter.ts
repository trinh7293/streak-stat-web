class DateRecord {
  goalId: string

  doneTime: Date

  constructor(
    goalId: string,
    doneTime: Date,
  ) {
    this.goalId = goalId
    this.doneTime = doneTime
  }
}

// Firestore data converter
export default {
  toFirestore(date: DateRecordType) {
    return {
      goalId: date.goalId,
      doneTime: date.doneTime,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new DateRecord(
      data?.goalId,
      data?.doneTime,
    )
  },
}
