import TYPES from '../actions/types'

export const addEvent = (event) => {
  return {
    type: TYPES.ADD_EVENT,
    event
  }
}

export const updateEvent = (event, previousEventGroupName) => {
  return {
    type: TYPES.UPDATE_EVENT,
    event,
    previousEventGroupName
  }
}
