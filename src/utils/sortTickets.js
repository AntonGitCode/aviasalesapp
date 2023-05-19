import { VIEW_FILTERS, STOPS_FILTERS } from '../constants'

const getStopsFromSegments = (segments) => {
  const [departure, arrival] = segments
  return [departure.stops.length, arrival.stops.length]
}

const sortTicketsByCheapest = (ticketsToSort) => {
  return ticketsToSort.slice().sort((t1, t2) => t1.price - t2.price)
}
const sortTicketsByFastest = (ticketsToSort) => {
  return ticketsToSort.slice().sort((t1, t2) => {
    const t1Duration = t1.segments.reduce((acc, { duration }) => acc + duration, 0)
    const t2Duration = t2.segments.reduce((acc, { duration }) => acc + duration, 0)
    return t1Duration - t2Duration
  })
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
