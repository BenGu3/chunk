import TYPES from '../actions/types'

const INITIAL_STATE = {
  tasks: []
}

export const taskListReducer = (state = INITIAL_STATE, action) => {
  const { task } = action
  switch (action.type) {
    case TYPES.ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          task
        ]
      }
    default:
      return state
  }
}
