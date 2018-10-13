import { getCalendarFormattedDate } from '../date-util';
import TYPES from '../actions/types'

const INITIAL_STATE = {
  events: {
    '2018-10-13': [],
    '2018-10-14': [],
    '2018-10-15': [],
    '2018-10-16': [],
    '2018-10-17': [],
    '2018-10-18': [],
    '2018-10-19': [],
    '2018-10-20': [],
    '2018-10-21': [],
    '2018-10-22': [],
    '2018-10-23': [],
    '2018-10-24': [],
    '2018-10-25': [],
    '2018-10-26': [],
    '2018-10-27': [],
    '2018-10-28': [],
    '2018-10-29': [],
    '2018-10-30': []
  }
}

export const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ADD_EVENT:
      return handleAddEvent(state, action)
    default:
      return state
  }
}

function handleAddEvent(state, action) {
  const { event } = action
  const formattedStartTime = getCalendarFormattedDate(event.startTime)

  if (!state.events[formattedStartTime]) {
    state.events[formattedStartTime] = []
  }

  return {
    ...state,
    events: {
      ...state.events,
      [formattedStartTime]: [
        ...state.events[formattedStartTime],
        event
      ]
    }
  }
}
