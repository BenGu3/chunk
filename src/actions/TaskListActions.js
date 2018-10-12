import TYPES from '../actions/types'

export const addTask = (task) => {
  return {
    type: TYPES.ADD_TASK,
    task
  }
}

export const editTask = (task, taskGroupName) => {
  return {
    type: TYPES.EDIT_TASK,
    task,
    taskGroupName
  }
}
