declare module 'v-calendar'

interface StateType {
  pickedDate: string;
  settingHabits: Array<SettingHabit>;
  habits: Array<Habit>;
  isAuthenticated: boolean;
  user: UserType | null;
}

interface UserType {
  uid: string;
  displayName: string;
}

interface UserFirestoreDoc {
  displayName: string;
  email: string;
}

interface SettingHabit {
  habitId: string;
  name: string;
  icon: string;
  description: string;
}

interface DateRecordType {
  uid: string;
  habitId: string;
  doneTime?: Date;
}

interface Habit {
  date: string;
  habitId: string;
  start: string;
  end: string;
  streakCount: number;
  doneTime: Date;
}


interface NewHabit {
  habitId: string;
  date: string;
  doneTime: firebase.firestore.Timestamp;
}

interface SingleDateHabits {
  habitId: string;
  icon: string;
  name: string;
  description: string;
  currentStreak?: number;
  bestStreak?: number;
  start?: string;
  end?: string;
  streakCount?: number;
  prevStreakCount?: number;
  doneTime?: Date;
}

interface HabitsStatistic {
  habitId: string;
  icon: string;
  name: string;
  description: string;
  currentStreak: number;
  bestStreak: number;
}

interface Streak {
  start: string;
  end: string;
  streakCount: number;
}
