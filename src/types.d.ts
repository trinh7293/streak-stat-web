declare module 'v-calendar'

interface StateType {
  pickedDate: string;
  settingGoals: Array<SettingGoal>;
  goals: Array<Goal>;
}

interface SettingGoal {
  goalId: string;
  name: string;
  icon: string;
  description: string;
}

interface DateRecordType {
  goalId: string;
  doneTime?: Date;
}

interface Goal {
  date: string;
  goalId: string;
  start: string;
  end: string;
  streakCount: number;
  doneTime: Date;
}


interface NewGoal {
  goalId: string;
  date: string;
  doneTime: firebase.firestore.Timestamp;
}

interface SingleDateGoals {
  goalId: string;
  icon: string;
  name: string;
  description: string;
  start?: string;
  end?: string;
  streakCount?: number;
  prevStreakCount?: number;
  doneTime?: Date;
}

interface GoalsStatistic {
  goalId: string;
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
