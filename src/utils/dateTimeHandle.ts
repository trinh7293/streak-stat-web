import moment from 'moment'

export const getTodayFormat = () => moment()
  .format('YYYY-MM-DD')

// get today timestamp UTC
export const getAdjacentDay = (date: string) => ({
  nextDay: moment(date).add(1, 'day').format('YYYY-MM-DD'),
  prevDay: moment(date).subtract(1, 'day')
    .format('YYYY-MM-DD'),
})
