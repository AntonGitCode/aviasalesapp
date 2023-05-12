import { SET_DATA_STATE } from '../actionTypes'
import { DATA_STATES } from '../../constants'

export function dataState(state = DATA_STATES.NOT_ASKED, action) {
  switch (action.type) {
    case SET_DATA_STATE:
      return action.payload
    default:
      return state
  }
}
