import { DATA_STATES, BASE_URL } from '../constants'

import { ADD_TICKETS, SET_DATA_STATE } from './actionTypes'

export const getTickets = () => {
  const _searchUrl = 'search'
  const _ticketsUrl = 'tickets?'

  return async (dispatch) => {
    dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADING })
    try {
      const { searchId } = await fetch(`${BASE_URL}${_searchUrl}`).then((res) => res.json())
      const ticketParams = new URLSearchParams({ searchId: searchId })
      const URL = `${BASE_URL}${_ticketsUrl}${ticketParams}`
      const ticketsSummary = []

      const fetchGetTickets = async (url) => {
        try {
          const response = await fetch(url)
          if (!response.ok) {
            if (response.status !== 500) {
              throw new Error('Error while fetching tickets')
            }
          }
          const { tickets, stop } = await response.json()
          ticketsSummary.push(...tickets)
          dispatch({ type: ADD_TICKETS, payload: ticketsSummary })
          dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADED })
          if (!stop) {
            await fetchGetTickets(url)
          } else return true
        } catch (err) {
          await fetchGetTickets(url)
        }
      }
      await fetchGetTickets(URL)
    } catch (err) {
      dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.FAIL })
    }
  }
}
