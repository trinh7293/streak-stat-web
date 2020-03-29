class Habit {
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
  toFirestore(habit: SettingHabit) {
    return {
      name: habit.name,
      icon: habit.icon,
      description: habit.description,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new Habit(
      data?.name,
      data?.icon,
      data?.description,
    )
  },
}
