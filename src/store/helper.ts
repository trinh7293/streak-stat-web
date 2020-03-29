import { getAdjacentDay } from '@/utils/dateTimeHandle'
import _ from 'lodash'
import moment from 'moment'

export default class ChangeHabits {
  habits: Habit[]

  date: string

  habitId: string

  doneTime: Date

  constructor(habits: Array<Habit>, docChanged: NewHabit) {
    this.habits = habits
    this.habitId = docChanged.habitId
    this.date = docChanged.date
    this.doneTime = docChanged.doneTime?.toDate()
  }

  addHabit() {
    let newHabits: Array<Habit> = []
    const {
      nextStreak,
      prevStreak,
    } = this.getAdjacentStreaks()
    if (nextStreak && prevStreak) {
      const oldStart = nextStreak.start
      const newStart = prevStreak.start
      const oldEnd = prevStreak.end
      const newEnd = nextStreak.end
      const newDocStreakCount = moment(this.date)
        .diff(moment(newStart), 'day') + 1
      const newDoc: Habit = {
        date: this.date,
        habitId: this.habitId,
        start: newStart,
        end: newEnd,
        doneTime: this.doneTime,
        streakCount: newDocStreakCount,
      }
      newHabits = [
        ...this.habits.map(g => {
          if (g.habitId !== this.habitId) {
            return g
          }
          if (
            g.end === oldEnd
          ) {
            return {
              ...g,
              end: newEnd,
            }
          }
          if (g.start === oldStart) {
            return {
              ...g,
              start: newStart,
              streakCount: g
                .streakCount + newDocStreakCount,
            }
          }
          return g
        }),
        newDoc,
      ]
    } else if (nextStreak) {
      const oldStart = nextStreak.start
      const newStart = this.date
      const newDoc: Habit = {
        date: this.date,
        habitId: this.habitId,
        start: newStart,
        end: nextStreak.end,
        doneTime: this.doneTime,
        streakCount: 1,
      }
      newHabits = [
        ...this.habits.map(g => {
          if (g.habitId !== this.habitId) {
            return g
          }
          if (g.start === oldStart) {
            return {
              ...g,
              start: newStart,
              streakCount: g.streakCount + 1,
            }
          }
          return g
        }),
        newDoc,
      ]
    } else if (prevStreak) {
      const oldEnd = prevStreak.end
      const newEnd = this.date
      const newDoc: Habit = {
        date: this.date,
        habitId: this.habitId,
        start: prevStreak.start,
        end: newEnd,
        doneTime: this.doneTime,
        streakCount: moment(this.date)
          .diff(moment(prevStreak.start), 'day') + 1,
      }
      newHabits = [
        ...this.habits.map(g => {
          if (g.habitId !== this.habitId) {
            return g
          }
          if (g.end === oldEnd) {
            return {
              ...g,
              end: newEnd,
            }
          }
          return g
        }),
        newDoc,
      ]
    } else {
      const newDoc: Habit = {
        date: this.date,
        habitId: this.habitId,
        start: this.date,
        end: this.date,
        doneTime: this.doneTime,
        streakCount: 1,
      }
      newHabits = [
        ...this.habits,
        newDoc,
      ]
    }
    return newHabits
  }

  deleteHabit() {
    const habitDelete = this.habits.find(
      item => item.habitId === this.habitId
        && item.date === this.date,
    )
    if (!habitDelete) return this.habits
    const {
      start,
      end,
      streakCount,
    } = habitDelete
    const newHabits = this.habits.filter(
      item => item.habitId !== this.habitId
        || item.date !== this.date,
    )
    const {
      nextDay,
      prevDay,
    } = getAdjacentDay(this.date)
    return newHabits.map(item => {
      if (
        item.habitId === this.habitId
        && item.start === start
        && item.end === end
      ) {
        if (item.streakCount < streakCount) {
          return {
            ...item,
            end: prevDay,
          }
        }
        if (item.streakCount > streakCount) {
          return {
            ...item,
            start: nextDay,
            streakCount: item.streakCount - streakCount,
          }
        }
      }
      return item
    })
  }

  getAdjacentStreaks() {
    const {
      nextDay,
      prevDay,
    } = getAdjacentDay(this.date)
    const nextStreak = _.find(this.habits, {
      habitId: this.habitId,
      start: nextDay,
    })
    const prevStreak = _.find(this.habits, {
      habitId: this.habitId,
      end: prevDay,
    })
    return {
      nextStreak,
      prevStreak,
    }
  }
}
