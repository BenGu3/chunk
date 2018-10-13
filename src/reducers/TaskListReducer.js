import { getCalendarFormattedDate } from '../date-util'
import TYPES from '../actions/types'

const INITIAL_STATE = {
  tasks: {}
}

export const taskListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ADD_TASK:
      return handleAddTask(state, action)
    case TYPES.EDIT_TASK:
      return handleEditTask(state, action)
    default:
      return state
  }
}

function handleAddTask(state, action) {
  const { task } = action
  const dueDate = getCalendarFormattedDate(task.dueTime)

  if (!state.tasks[dueDate]) {
    state.tasks[dueDate] = []
  }

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [dueDate]: [
        ...state.tasks[dueDate],
        task
      ]
    }
  }
}

function handleEditTask(state, action) {
  const { task, taskGroupName } = action
  return {
    ...state,
    tasks: {
      ...state.tasks,
      [taskGroupName]: [
        ...state.tasks[taskGroupName].map(t => {
          return t.id === task.id ? task : t
        })
      ]
    }
  }
}

