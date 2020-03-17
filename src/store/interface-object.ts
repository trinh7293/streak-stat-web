export interface StateType {
  pickedDate: string;
  settingGoals: Record<string, SettingGoal>;
  goals: Array<Goal>;
}

export interface SettingGoal {
  name: string;
  description: string;
}

export interface SettingGoalInArray {
  goalId: string;
  name: string;
  description: string;
}

export interface Goal {
  date: string;
  goalId: string;
  start: string;
  end: string;
  streakCount: number;
}


export interface NewGoal {
  date: string;
  goalId: string;
}

export interface SingleDateGoals {
  goalId: string;
  name: string;
  description: string;
  start?: string;
  end?: string;
  streakCount?: number;
}
