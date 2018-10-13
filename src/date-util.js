export const getCalendarFormattedDate = (date) => {
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

export const getTaskFormattedDate = (calendarDate) => {
  const fullDate = new Date(calendarDate + ' MDT')
  return fullDate.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short'
  })
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
