import TYPES from '../actions/types'

const INITIAL_STATE = {
  events: []
}

export const calendarReducer = (state = INITIAL_STATE, action) => {
  const { event } = action
  switch (action.type) {
    case TYPES.ADD_EVENT:
      return {
        ...state,
        events: [
          ...state.events,
          event
        ]
      }
    default:
      return state
  }
}
