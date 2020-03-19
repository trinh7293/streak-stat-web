interface StateType {
  pickedDate: string;
  settingGoals: Record<string, SettingGoal>;
  goals: Array<Goal>;
}

interface SettingGoal {
  name: string;
  description: string;
}

interface SettingGoalInArray {
  goalId: string;
  name: string;
  description: string;
}

interface Goal {
  date: string;
  goalId: string;
  start: string;
  end: string;
  streakCount: number;
}


interface NewGoal {
  date: string;
  goalId: string;
}

interface SingleDateGoals {
  goalId: string;
  name: string;
  description: string;
  start?: string;
  end?: string;
  streakCount?: number;
}
