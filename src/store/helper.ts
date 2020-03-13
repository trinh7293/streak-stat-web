import { getAdjacentDay } from '@/utils/dateTimeHandle'
import _ from 'lodash'
import moment from 'moment'
import { Goal, NewGoal } from './interface-object'

export default class ChangeGoals {
  goals: Goal[]

  date: string

  goalId: string

  constructor(goals: Array<Goal>, docChanged: NewGoal) {
    this.goals = goals
    this.goalId = docChanged.goalId
    this.date = docChanged.date
  }

  addGoal() {
    let newGoals: Array<Goal> = []
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
      const newDoc: Goal = {
        date: this.date,
        goalId: this.goalId,
        start: newStart,
        end: newEnd,
        streakCount: newDocStreakCount,
      }
      newGoals = [
        ...this.goals.map(g => {
          if (g.goalId !== this.goalId) {
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
      const newDoc = {
        date: this.date,
        goalId: this.goalId,
        start: newStart,
        end: nextStreak.end,
        streakCount: 1,
      }
      newGoals = [
        ...this.goals.map(g => {
          if (g.goalId !== this.goalId) {
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
      const newDoc = {
        date: this.date,
        goalId: this.goalId,
        start: prevStreak.start,
        end: newEnd,
        streakCount: moment(this.date)
          .diff(moment(prevStreak.start), 'day') + 1,
      }
      newGoals = [
        ...this.goals.map(g => {
          if (g.goalId !== this.goalId) {
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
      const newDoc = {
        date: this.date,
        goalId: this.goalId,
        start: this.date,
        end: this.date,
        streakCount: 1,
      }
      newGoals = [
        ...this.goals,
        newDoc,
      ]
    }
    return newGoals
  }

  deleteGoal() {
    const goalDelete = this.goals.find(
      item => item.goalId === this.goalId
        && item.date === this.date,
    )
    if (!goalDelete) return this.goals
    const {
      start,
      end,
      streakCount,
    } = goalDelete
    const newGoals = this.goals.filter(
      item => item.goalId !== this.goalId
        || item.date !== this.date,
    )
    const {
      nextDay,
      prevDay,
    } = getAdjacentDay(this.date)
    return newGoals.map(item => {
      if (
        item.goalId === this.goalId
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
    const nextStreak = _.find(this.goals, {
      goalId: this.goalId,
      start: nextDay,
    })
    const prevStreak = _.find(this.goals, {
      goalId: this.goalId,
      end: prevDay,
    })
    return {
      nextStreak,
      prevStreak,
    }
  }
}
