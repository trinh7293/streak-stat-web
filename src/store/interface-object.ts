import {
  WEAKING_UP_EARLY, RUNNING, READING,
} from '@/constants'

export interface DateData {
  [WEAKING_UP_EARLY]?: boolean;
  [RUNNING]?: boolean;
  [READING]?: boolean;
}
