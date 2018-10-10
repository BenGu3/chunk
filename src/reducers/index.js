import { combineReducers } from 'redux';

import { calendarReducer } from './CalendarReducer'

export default combineReducers({
  calendar: calendarReducer
});
