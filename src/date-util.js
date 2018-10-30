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
