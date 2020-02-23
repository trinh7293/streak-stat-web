import {
  ID,
  NAME,
  ICON,
  DATE,
  GOAL_DATA,
  STREAK_NUM,
  IS_END_STREAK,
  START_STREAK,
} from '@/constants'

export interface StateInterface {
  pickedDate: string;
  goalSettings: Array<GoalSetting>;
  dateDatas: Array<DateData>;
}

export interface GoalSetting {
  [ID]: string;
  [NAME]: string;
  [ICON]: string;
}

export interface DateData {
  [DATE]: string;
  [GOAL_DATA]: Array<GoalData>;
}

export interface GoalDataServer {
  [START_STREAK]: string;
  [STREAK_NUM]: number;
  [IS_END_STREAK]: boolean;
}

export interface GoalData {
  [ID]: string;
  [START_STREAK]: string;
  [STREAK_NUM]: number;
  [IS_END_STREAK]: boolean;
}

export interface FullGoalData {
  [ID]: string;
  [NAME]: string;
  [ICON]: string;
  [START_STREAK]?: string;
  [STREAK_NUM]?: number;
  [IS_END_STREAK]?: boolean;
}
