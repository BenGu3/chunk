import { combineReducers } from 'redux'

import { calendarReducer } from './CalendarReducer'
import { taskListReducer } from './TaskListReducer'

export default combineReducers({
  calendar: calendarReducer,
  taskList: taskListReducer
})
