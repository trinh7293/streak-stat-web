class Habit {
  name: string

  description: string

  icon: string

  iconColor: string

  constructor(
    name: string,
    description: string,
    icon: string,
    iconColor: string,
  ) {
    this.name = name
    this.description = description
    this.icon = icon
    this.iconColor = iconColor
  }
}

// Firestore data converter
export default {
  toFirestore(habit: SettingHabit) {
    return {
      name: habit.name,
      description: habit.description,
      icon: habit.icon,
      iconColor: habit.iconColor,
    }
  },
  fromFirestore(
    snapshot: firebase.firestore.DocumentSnapshot,
  ) {
    const data = snapshot.data()
    return new Habit(
      data?.name,
      data?.description,
      data?.icon,
      data?.iconColor,
    )
  },
}
