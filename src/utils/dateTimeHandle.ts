import moment from 'moment'

export const getTodayFormat = () => moment().format('YYYY-MM-DD')

// get today timestamp UTC
export const getTodayTp = () => 10000
