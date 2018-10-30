import { getCalendarFormattedDate } from '../date-util';
import TYPES from '../actions/types'

const INITIAL_STATE = {
  events: {
    '2018-10-30': [
      {
        name: 'CS 452',
        startTime: new Date('October 30, 2018 09:30:00'),
        endTime: new Date('October 30, 2018 10:50:00'),
        id: 0,
        type: 'event'
      },
      {
        name: 'CS 324',
        startTime: new Date('October 30, 2018 13:35:00'),
        endTime: new Date('October 30, 2018 14:50:00'),
        id: 1,
        type: 'event'
      },
      {
        name: 'CS 356',
        startTime: new Date('October 30, 2018 15:00:00'),
        endTime: new Date('October 30, 2018 16:15:00'),
        id: 2,
        type: 'event'
      }
    ],
    '2018-10-31': [
      {
        name: 'Sleep',
        startTime: new Date('October 31, 2018 00:00:00'),
        endTime: new Date('October 31, 2018 8:00:00'),
        id: 3,
        type: 'event'
      }
    ],
    '2018-11-1': [
      {
        name: 'CS 452',
        startTime: new Date('November 1, 2018 09:30:00'),
        endTime: new Date('November 1, 2018 10:50:00'),
        id: 4,
        type: 'event'
      },
      {
        name: 'CS 324',
        startTime: new Date('November 1, 2018 13:35:00'),
        endTime: new Date('November 1, 2018 14:50:00'),
        id: 5,
        type: 'event'
      },
      {
        name: 'CS 356',
        startTime: new Date('November 1, 2018 15:00:00'),
        endTime: new Date('November 1, 2018 16:15:00'),
        id: 6,
        type: 'event'
      }
    ]
  }
}

export const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPES.ADD_EVENT:
      return handleAddEvent(state, action)
    case TYPES.UPDATE_EVENT:
      return handleUpdateEvent(state, action)
    default:
      return state
  }
}

function handleAddEvent(state, action) {
  const { event } = action
  const formattedStartTime = getCalendarFormattedDate(event.startTime)

  if (!state.events[formattedStartTime]) {
    state.events[formattedStartTime] = []
  }

  return {
    ...state,
    events: {
      ...state.events,
      [formattedStartTime]: [
        ...state.events[formattedStartTime],
        event
      ]
    }
  }
}

function handleUpdateEvent(state, action) {
  const { event, previousEventGroupName } = action
  const updatedStartDate = getCalendarFormattedDate(event.startTime)

  if (!state.events[updatedStartDate]) {
    state.events[updatedStartDate] = []
  }

  if (previousEventGroupName === updatedStartDate) {
    return {
      ...state,
      events: {
        ...state.events,
        [previousEventGroupName]: [
          ...state.events[previousEventGroupName].map(e => {
            return e.id === event.id ? event : e
          })
        ]
      }
    }
  }

  return {
    ...state,
    events: {
      ...state.events,
      [previousEventGroupName]: [
        ...state.events[previousEventGroupName].reduce((agg, e) => {
          if (e.id !== event.id) {
            return [...agg, e]
          }
          return agg
        }, [])
      ],
      [updatedStartDate]: [
        ...state.events[updatedStartDate],
        event
      ]
    }
  }
}
