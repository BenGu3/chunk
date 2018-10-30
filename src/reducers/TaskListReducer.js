import { getCalendarFormattedDate } from '../date-util'
import TYPES from '../actions/types'

const INITIAL_STATE = {
  tasks: {
    '2018-10-30': [
      {
        name: 'CS 452 Homework Due',
        dueTime: new Date('October 30, 2018 09:30:00'),
        id: 0,
        type: 'task'
      },
      {
        name: 'CS 324 Homework Due',
        dueTime: new Date('October 30, 2018 13:35:00'),
        id: 1,
        type: 'task'
      },
      {
        name: 'CS 356 Homework Due',
        dueTime: new Date('October 30, 2018 15:00:00'),
        id: 2,
        type: 'task'
      }
    ],
    '2018-10-31': [
      {
        name: 'Call home',
        dueTime: new Date('October 31, 2018 16:00:00'),
        id: 3,
        type: 'task'
      }
    ],
    '2018-11-1': [
      {
        name: 'CS 452 Lab Due',
        dueTime: new Date('November 1, 2018 09:30:00'),
        id: 4,
        type: 'task'
      },
      {
        name: 'CS 324 Lab Due',
        dueTime: new Date('November 1, 2018 13:35:00'),
        id: 5,
        type: 'task'
      },
      {
        name: 'CS 356 Reading Due',
        dueTime: new Date('November 1, 2018 15:00:00'),
        id: 6,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 1:00:00'),
        id: 7,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 2:00:00'),
        id: 8,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 3:00:00'),
        id: 9,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 4:00:00'),
        id: 10,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 5:00:00'),
        id: 11,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 6:00:00'),
        id: 12,
        type: 'task'
      },
      {
        name: 'Sooooo many things to do!!!!',
        dueTime: new Date('November 1, 2018 7:00:00'),
        id: 13,
        type: 'task'
      },

    ]
  }
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

