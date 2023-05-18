import { SET_VIEW_FILTER, SET_STOPS_FILTER, SET_FILTERS_APPLIED } from './actionTypes'

export const setStopsFilter = (filter) => ({ type: SET_STOPS_FILTER, payload: filter })
export const setViewFilter = (filter) => ({ type: SET_VIEW_FILTER, payload: filter })
export const setFiltersApplied = (filtersApplied) => ({ type: SET_FILTERS_APPLIED, payload: filtersApplied })
