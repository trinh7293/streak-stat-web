export interface StateType {
  pickedDate: string;
  settingGoals: Array<SettingGoal>;
  streakGoals: Array<StreakGoal>;
}

export interface SettingGoal {
  id: string;
  name: string;
  icon: string;
}

export interface StreakGoal {
  id: string;
  goalSettingId: string;
  start: string;
  end: string;
}

export interface SingleDateGoal {
  settingId: string;
  name: string;
  icon: string;
  streakId?: string;
  start?: string;
  streakCount?: number;
}
