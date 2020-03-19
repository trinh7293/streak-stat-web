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
}


interface NewGoal {
  date: string;
  goalId: string;
}

interface SingleDateGoals {
  goalId: string;
  icon: string;
  name: string;
  description: string;
  start?: string;
  end?: string;
  streakCount?: number;
}
