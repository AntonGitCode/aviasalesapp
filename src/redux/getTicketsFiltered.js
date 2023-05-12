import { VIEW_FILTERS, STOPS_FILTERS } from '../constants'

const getViewFilter = (state) => state.viewFilter
const getStopsFilter = (state) => state.stopsFilter
const getTickets = (state) => state.tickets

const getStopsFromSegments = (segments) => {
  const [departure, arrival] = segments
  return [departure.stops.length, arrival.stops.length]
}

const sortTicketsByCheapest = (tickets) => {
  return tickets.slice().sort((t1, t2) => t1.price - t2.price)
}

const sortTicketsByFastest = (tickets) => {
  return tickets.slice().sort((t1, t2) => {
    const t1Duration = t1.segments.reduce((acc, { duration }) => acc + duration, 0)
    const t2Duration = t2.segments.reduce((acc, { duration }) => acc + duration, 0)
    return t1Duration - t2Duration
  })
}

const filterTicketsByStops = (stopFilter, tickets) => {
  return tickets.filter(({ segments }) => {
    const [fromLength, toLength] = getStopsFromSegments(segments)
    if (stopFilter.length === 0) return tickets
    const relevant = stopFilter.map((item) => (item !== STOPS_FILTERS.ALL ? Number(item) : item))
    return relevant.includes(fromLength) && relevant.includes(toLength)
  })
}

export const getTicketsByViewFilter = (state) => {
  const viewFilter = getViewFilter(state)
  const tickets = getTickets(state)

  switch (viewFilter) {
    case VIEW_FILTERS.CHEAPEST:
      return sortTicketsByCheapest(tickets)
    case VIEW_FILTERS.FASTEST:
      return sortTicketsByFastest(tickets)
    default:
      return tickets
  }
}

export const getTicketByStopsFilter = (state) => {
  const stopFilter = getStopsFilter(state)
  const tickets = getTickets(state)

  return filterTicketsByStops(stopFilter, tickets)
}

export const getTicketByStopsAndViewFilter = (state) => {
  const viewFilter = getViewFilter(state)
  const tickets = getTicketByStopsFilter(state)

  switch (viewFilter) {
    case VIEW_FILTERS.CHEAPEST:
      return sortTicketsByCheapest(tickets)
    case VIEW_FILTERS.FASTEST:
      return sortTicketsByFastest(tickets)
    default:
      return tickets
  }
}
