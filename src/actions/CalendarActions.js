import TYPES from '../actions/types'

export const addEvent = (event) => {
  return {
    type: TYPES.ADD_EVENT,
    event
  }
}
