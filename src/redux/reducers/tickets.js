import { ADD_TICKETS } from '../actionTypes'

export const tickets = (state = [], action) => {
  switch (action.type) {
    case ADD_TICKETS:
      return [...state, ...action.payload]
    default:
      return state
  }
}
