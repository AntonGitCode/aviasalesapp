import { DATA_STATES, BASE_URL } from '../constants'

import { ADD_TICKETS, SET_VIEW_FILTER, SET_STOPS_FILTER, SET_DATA_STATE, SET_FILTERS_APPLIED } from './actionTypes'

export const getTickets = () => {
  const _searchUrl = 'search'
  const _ticketsUrl = 'tickets?'

  return async (dispatch) => {
    dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADING })
    const { searchId } = await fetch(`${BASE_URL}${_searchUrl}`).then((res) => res.json())
    const ticketParams = new URLSearchParams({ searchId: searchId })
    const URL = `${BASE_URL}${_ticketsUrl}${ticketParams}`
    const ticketsSummary = []
    const fetchGetTickets = async (url) => {
      try {
        const { tickets, stop } = await fetch(url).then((res) => res.json())
        ticketsSummary.push(...tickets)
        if (!stop) await fetchGetTickets(url)
        else return true
      } catch (err) {
        await fetchGetTickets(url)
      }
    }
    await fetchGetTickets(URL)
    dispatch({ type: SET_DATA_STATE, payload: DATA_STATES.LOADED })
    dispatch({ type: ADD_TICKETS, payload: ticketsSummary })
  }
}

export const setStopsFilter = (filter) => ({ type: SET_STOPS_FILTER, payload: filter })
export const setViewFilter = (filter) => ({ type: SET_VIEW_FILTER, payload: filter })
export const setFiltersApplied = (filtersApplied) => ({ type: SET_FILTERS_APPLIED, payload: filtersApplied })
