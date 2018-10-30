export const getCalendarFormattedDate = (date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

export const getTaskFormattedDate = (calendarDate) => {
  const parsedDate = calendarDate.split('-')
  const fullDate = new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2])
  return fullDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short'
  })
}

export const getDateFromTaskFormattedDate = (taskFormattedDate) => {
  const parsedDate = taskFormattedDate.split('-')
  const fullDate = new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2])
  return fullDate
}

export const getDueTime = (dueDate) => {
  return dueDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  })
}

export const isToday = (date) => {
  return date === getCalendarFormattedDate(new Date())
}

export const isTomorrow = (date) => {
  const newDate = new Date()
  newDate.setDate(newDate.getDate() + 1)
  return date === getCalendarFormattedDate(newDate)
}

export const timeSorter = (time1, time2) => {
  return getDateFromTaskFormattedDate(time1) - getDateFromTaskFormattedDate(time2)
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDayOfWeek(date) {
  switch (date.getDay()) {
    case 0:
      return 'Sunday'
    case 1:
      return 'Monday'
    case 2:
      return 'Tuesday'
    case 3:
      return 'Wednesday'
    case 4:
      return 'Thursday'
    case 5:
      return 'Friday'
    case 6:
      return 'Saturday'
  }
}

export function getCalendarHeaderDate(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

export function getCalendarCurrentWeek(date) {
  switch (date.getDay()) {
    case 0:
      return {
        'Sunday': date,
        'Monday': addDays(date, 1),
        'Tuesday': addDays(date, 2),
        'Wednesday': addDays(date, 3),
        'Thursday': addDays(date, 4),
        'Friday': addDays(date, 5),
        'Saturday': addDays(date, 6)
      }
    case 1:
      return {
        'Sunday': addDays(date, -1),
        'Monday': date,
        'Tuesday': addDays(date, 1),
        'Wednesday': addDays(date, 2),
        'Thursday': addDays(date, 3),
        'Friday': addDays(date, 4),
        'Saturday': addDays(date, 5)
      }
    case 2:
      return {
        'Sunday': addDays(date, -2),
        'Monday': addDays(date, -1),
        'Tuesday': date,
        'Wednesday': addDays(date, 1),
        'Thursday': addDays(date, 2),
        'Friday': addDays(date, 3),
        'Saturday': addDays(date, 4)
      }
    case 3:
      return {
        'Sunday': addDays(date, -3),
        'Monday': addDays(date, -2),
        'Tuesday': addDays(date, -1),
        'Wednesday': date,
        'Thursday': addDays(date, 1),
        'Friday': addDays(date, 2),
        'Saturday': addDays(date, 3)
      }
    case 4:
      return {
        'Sunday': addDays(date, -4),
        'Monday': addDays(date, -3),
        'Tuesday': addDays(date, -2),
        'Wednesday': addDays(date, -1),
        'Thursday': date,
        'Friday': addDays(date, 1),
        'Saturday': addDays(date, 2)
      }
    case 5:
      return {
        'Sunday': addDays(date, -5),
        'Monday': addDays(date, -4),
        'Tuesday': addDays(date, -3),
        'Wednesday': addDays(date, -2),
        'Thursday': addDays(date, -1),
        'Friday': date,
        'Saturday': addDays(date, 1)
      }
    case 6:
      return {
        'Sunday': addDays(date, -6),
        'Monday': addDays(date, -5),
        'Tuesday': addDays(date, -4),
        'Wednesday': addDays(date, -3),
        'Thursday': addDays(date, -2),
        'Friday': addDays(date, -1),
        'Saturday': date
      }
  }
}


export function getTimeDifference(date1, date2) {
  return ((date2.getHours() * 60) + (date2.getMinutes())) - ((date1.getHours() * 60) + (date1.getMinutes()))
}
