declare module 'v-calendar'

interface StateType {
  pickedDate: string;
  settingGoals: Record<string, SettingGoal>;
  goals: Array<Goal>;
}

interface SettingGoal {
  name: string;
  icon: string;
  description: string;
}

interface DateRecordType {
  goalId: string;
  doneTime: Date;
}

interface SettingGoalInArray {
  goalId: string;
  name: string;
  icon: string;
  description: string;
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
