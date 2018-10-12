import TYPES from '../actions/types'

const getDueTime = (task) => {
  return task.dueTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  })
}

const getShortDueDate = (task) => {
  return task.dueTime.toLocaleString('en-US', {
    day: 'numeric',
    month: 'short'
  })
}

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

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const dueDate = task.dueTime.toDateString()
  if (dueDate === today.toDateString()) {
    if (!state.tasks['Today']) {
      state.tasks['Today'] = []
    }
    return {
      ...state,
      tasks: {
        ...state.tasks,
        'Today': [
          ...state.tasks['Today'],
          { ...task, dueTime: getDueTime(task) }
        ]
      }
    }
  } else if (dueDate === tomorrow.toDateString()) {
    if (!state.tasks['Tomorrow']) {
      state.tasks['Tomorrow'] = []
    }
    return {
      ...state,
      tasks: {
        ...state.tasks,
        'Tomorrow': [
          ...state.tasks['Tomorrow'],
          { ...task, dueTime: getDueTime(task) }
        ]
      }
    }
  } else {
    const shortDueDate = getShortDueDate(task)
    if (!state.tasks[shortDueDate]) {
      state.tasks[shortDueDate] = []
    }
    return {
      ...state,
      tasks: {
        ...state.tasks,
        [shortDueDate]: [
          ...state.tasks[shortDueDate],
          { ...task, dueTime: getDueTime(task) }
        ]
      }
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

