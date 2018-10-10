import TYPES from '../actions/types'

export const addTask = (task) => {
  return {
    type: TYPES.ADD_TASK,
    task
  }
}
