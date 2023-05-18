import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

import { getTickets } from '../../redux/actions'
import { DATA_STATES, VIEW_FILTERS, STOPS_FILTERS } from '../../constants'
import { Ticket } from '../Ticket/Ticket'
import { Loader } from '../Loader/Loader'

import styles from './TicketList.module.css'

function TicketList({ tickets, dataState, viewFilter, getTickets, filtersApplied, stopsFilter }) {
  const [localTickets, setLocalTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [numShowTickets, setNumShowTickets] = useState(5)

  const loaderRender = (num) => {
    let loaderArray = []
    Array(num)
      .fill()
      .forEach(() => {
        loaderArray = loaderArray.concat(<Loader key={uuidv4()} />)
      })
    return loaderArray
  }

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

  const filterTicketsByStops = () => {
    let ticketsToFilter = [...localTickets]
    return ticketsToFilter.filter(({ segments }) => {
      const [fromLength, toLength] = getStopsFromSegments(segments)
      if (stopsFilter.length === 0) return ticketsToFilter
      const relevant = stopsFilter.map((item) => (item !== STOPS_FILTERS.ALL ? Number(item) : item))
      return relevant.includes(fromLength) && relevant.includes(toLength)
    })
  }

  const getTicketByStopsAndViewFilter = () => {
    const newTickets = filterTicketsByStops()
    switch (viewFilter) {
      case VIEW_FILTERS.CHEAPEST:
        return sortTicketsByCheapest(newTickets)
      case VIEW_FILTERS.FASTEST:
        return sortTicketsByFastest(newTickets)
      default:
        return newTickets
    }
  }

  useEffect(() => {
    getTickets()
  }, [])

  useEffect(() => {
    setLocalTickets(tickets)
    setFilteredTickets(getTicketByStopsAndViewFilter())
  }, [tickets])

  useEffect(() => {
    setNumShowTickets(5)
  }, [stopsFilter, viewFilter])

  useEffect(() => {
    setFilteredTickets(getTicketByStopsAndViewFilter())
  }, [stopsFilter, viewFilter, numShowTickets])

  const incShowTickets = () => {
    setNumShowTickets((prevNumShowTickets) => prevNumShowTickets + 5)
  }

  return (
    <>
      {!tickets.length && filtersApplied && dataState === DATA_STATES.LOADED && (
        <h2 className={styles.nofilters}>Рейсов, подходящих под заданные фильтры, не найдено</h2>
      )}
      {filtersApplied ? (
        <>
          {dataState === DATA_STATES.LOADING && loaderRender(numShowTickets)}
          <ul className={styles.list}>
            {dataState === DATA_STATES.LOADED &&
              filteredTickets.map((ticket, i) =>
                i < numShowTickets ? (
                  <li key={ticket.segments[0].date}>
                    <Ticket {...ticket} />
                  </li>
                ) : null
              )}
          </ul>
          {dataState === DATA_STATES.LOADED && (
            <button className={styles.morebtn} onClick={() => incShowTickets()}>
              Показать еще 5 билетов
            </button>
          )}
        </>
      ) : (
        <h2 className={styles.nofilters}>Фильтры не заданы</h2>
      )}
    </>
  )
}

function mapStateToProps(store) {
  return {
    tickets: store.tickets,
    dataState: store.dataState,
    viewFilter: store.viewFilter,
    stopsFilter: store.stopsFilter,
    filtersApplied: store.filtersApplied,
  }
}

export default connect(mapStateToProps, { getTickets })(TicketList)
