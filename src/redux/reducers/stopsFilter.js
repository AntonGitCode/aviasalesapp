import { SET_STOPS_FILTER } from '../actionTypes'
import { STOPS_FILTERS } from '../../constants'

export function stopsFilter(state = [STOPS_FILTERS.ALL], action) {
  switch (action.type) {
    case SET_STOPS_FILTER:
      return action.payload
    default:
      return state
  }
}
