import { getCalendarFormatted } from '../date-util'
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
  tasks: {
    'Today': [
      {
        dueTime: "12:15 PM",
        id: 0,
        name: "Asdad"
      }
    ]
  },
  tasksByDay: {
    '2018-10-12': [
      {
        dueTime: new Date(),
        id: 0,
        name: "Asdad"
      }
    ]
  }
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
  const dueDate = getCalendarFormatted(task.dueTime)

  if (!state.tasksByDay[dueDate]) {
    state.tasksByDay[dueDate] = []
  }

  if (dueDate === getCalendarFormatted(today)) {
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
      },
      tasksByDay: {
        ...state.tasksByDay,
        [dueDate]: [
          ...state.tasksByDay[dueDate],
          task
        ]
      }
    }
  } else if (dueDate === getCalendarFormatted(tomorrow)) {
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
      },
      tasksByDay: {
        ...state.tasksByDay,
        [dueDate]: [
          ...state.tasksByDay[dueDate],
          task
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
      },
      tasksByDay: {
        ...state.tasksByDay,
        [dueDate]: [
          ...state.tasksByDay[dueDate],
          task
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

