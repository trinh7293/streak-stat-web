class Goal {
  name: string

  description: string

  icon: string

  constructor(
    name: string,
    description: string,
    icon: string,
  ) {
    this.name = name
    this.description = description
    this.icon = icon
  }
}

// Firestore data converter
export default {
  toFirestore(goal: SettingGoal) {
    return {
      name: goal.name,
      icon: goal.icon,
      description: goal.description,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new Goal(
      data?.name,
      data?.icon,
      data?.description,
    )
  },
}
