import { getCalendarFormattedDate } from '../date-util'
import TYPES from '../actions/types'

const INITIAL_STATE = {
  tasks: {}
}

export const taskListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ADD_TASK:
      return handleAddTask(state, action)
    case TYPES.UPDATE_TASK:
      return handleUpdateTask(state, action)
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

function handleUpdateTask(state, action) {
  const { task, previousTaskGroupName } = action
  const updatedDueDate = getCalendarFormattedDate(task.dueTime)

  if (!state.tasks[updatedDueDate]) {
    state.tasks[updatedDueDate] = []
  }

  if (previousTaskGroupName === updatedDueDate) {
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [previousTaskGroupName]: [
          ...state.tasks[previousTaskGroupName].map(t => {
            return t.id === task.id ? task : t
          })
        ]
      }
    }
  }

  return {
    ...state,
    tasks: {
      ...state.tasks,
      [previousTaskGroupName]: [
        ...state.tasks[previousTaskGroupName].reduce((agg, t) => {
          if (t.id !== task.id) {
            return [...agg, t]
          }
          return agg
        }, [])
      ],
      [updatedDueDate]: [
        ...state.tasks[updatedDueDate],
        task
      ]
    }
  }
}

