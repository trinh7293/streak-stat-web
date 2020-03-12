export interface StateType {
  pickedDate: string;
  settingGoals: Record<string, SettingGoal>;
  goals: Array<Goal>;
}

export interface SettingGoal {
  name: string;
  icon: string;
}

export interface SettingGoalInArray {
  settingId: string;
  name: string;
  icon: string;
}

export interface Goal {
  goalId: string;
  settingId: string;
  date: string;
  start: string;
  end: string;
  streakCount: number;
}


export interface NewGoal {
  goalId: string;
  settingId: string;
  date: string;
}

export interface SingleDateGoals {
  goalId: string;
  settingId: string;
  name: string;
  icon: string;
  start?: string;
  end?: string;
  streakCount?: number;
}
