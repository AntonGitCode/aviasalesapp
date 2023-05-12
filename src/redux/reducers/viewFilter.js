import { VIEW_FILTERS } from '../../constants'
import { SET_VIEW_FILTER } from '../actionTypes'

export function viewFilter(state = VIEW_FILTERS.ALL, action) {
  switch (action.type) {
    case SET_VIEW_FILTER:
      return action.payload
    default:
      return state
  }
}
