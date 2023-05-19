import { VIEW_FILTERS, STOPS_FILTERS } from '../constants'

import { sortTicketsByCheapest } from './sortTickets'
import { sortTicketsByFastest } from './sortTickets'

const getStopsFromSegments = (segments) => {
  const [departure, arrival] = segments
  return [departure.stops.length, arrival.stops.length]
}

const filterTicketsByStops = (tickets, stopsFilter) => {
  let ticketsToFilter = [...tickets]
  return ticketsToFilter.filter(({ segments }) => {
    const [fromLength, toLength] = getStopsFromSegments(segments)
    if (stopsFilter.length === 0) return ticketsToFilter
    const relevant = stopsFilter.map((item) => (item !== STOPS_FILTERS.ALL ? Number(item) : item))
    return relevant.includes(fromLength) && relevant.includes(toLength)
  })
}

export const getTicketByStopsAndViewFilter = (tickets, stopsFilter, viewFilter) => {
  const newTickets = filterTicketsByStops(tickets, stopsFilter)
  switch (viewFilter) {
    case VIEW_FILTERS.CHEAPEST:
      return sortTicketsByCheapest(newTickets)
    case VIEW_FILTERS.FASTEST:
      return sortTicketsByFastest(newTickets)
    default:
      return newTickets
  }
}
