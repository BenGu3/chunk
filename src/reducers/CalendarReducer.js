import { getCalendarFormatted } from '../date-util';
import TYPES from '../actions/types'

const INITIAL_STATE = {
  events: {
    '2018-10-12': [
      {
        startTime: new Date(),
        endTime: new Date(),
        id: 0,
        name: "Asdad"
      }
    ]
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
  const formattedStartTime = getCalendarFormatted(event.startTime)

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
