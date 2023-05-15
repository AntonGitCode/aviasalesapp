import { SET_FILTERS_APPLIED } from '../actionTypes'

export function filtersApplied(state = true, action) {
  switch (action.type) {
    case SET_FILTERS_APPLIED:
      return action.payload
    default:
      return state
  }
}
