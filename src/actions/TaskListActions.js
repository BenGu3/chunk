import TYPES from '../actions/types'

export const addTask = (task) => {
  return {
    type: TYPES.ADD_TASK,
    task
  }
}

export const updateTask = (task, previousTaskGroupName) => {
  return {
    type: TYPES.UPDATE_TASK,
    task,
    previousTaskGroupName
  }
}
