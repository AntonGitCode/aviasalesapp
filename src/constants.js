export const BASE_URL = 'https://aviasales-test-api.kata.academy/'

export const DATA_STATES = {
  NOT_ASKED: 'notAsked',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAIL: 'fail',
}

export const API_DELAY_MS = 500

export const VIEW_FILTERS = {
  ALL: 'all',
  CHEAPEST: 'cheapest',
  FASTEST: 'fastest',
}

export const STOPS_FILTERS = {
  ALL: 'all',
  0: 0,
  1: 1,
  2: 2,
  3: 3,
}

export const checkboxes = [
  {
    name: STOPS_FILTERS.ALL,
    key: STOPS_FILTERS.ALL,
    label: 'Все',
  },
  {
    name: STOPS_FILTERS[0],
    key: STOPS_FILTERS[0],
    label: 'Без пересадок',
  },
  {
    name: STOPS_FILTERS[1],
    key: STOPS_FILTERS[1],
    label: '1 пересадка',
  },
  {
    name: STOPS_FILTERS[2],
    key: STOPS_FILTERS[2],
    label: '2 пересадки',
  },
  {
    name: STOPS_FILTERS[3],
    key: STOPS_FILTERS[3],
    label: '3 пересадки',
  },
]
