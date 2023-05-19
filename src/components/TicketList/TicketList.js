import React, { useEffect, useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

import { getTickets } from '../../redux/fetchApi'
import { DATA_STATES, VIEW_FILTERS, STOPS_FILTERS } from '../../constants'
import { Ticket } from '../Ticket/Ticket'
import { Loader } from '../Loader/Loader'

import styles from './TicketList.module.css'

function TicketList({ tickets, dataState, viewFilter, getTickets, filtersApplied, stopsFilter }) {
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

  const filterTicketsByStops = useMemo(() => {
    let ticketsToFilter = [...tickets]
    return ticketsToFilter.filter(({ segments }) => {
      const [fromLength, toLength] = getStopsFromSegments(segments)
      if (stopsFilter.length === 0) return ticketsToFilter
      const relevant = stopsFilter.map((item) => (item !== STOPS_FILTERS.ALL ? Number(item) : item))
      return relevant.includes(fromLength) && relevant.includes(toLength)
    })
  }, [tickets, stopsFilter])

  const filteredTicketList = useMemo(() => {
    const newTickets = filterTicketsByStops
    switch (viewFilter) {
      case VIEW_FILTERS.CHEAPEST:
        return sortTicketsByCheapest(newTickets)
      case VIEW_FILTERS.FASTEST:
        return sortTicketsByFastest(newTickets)
      default:
        return newTickets
    }
  }, [viewFilter, filterTicketsByStops])

  useEffect(() => {
    getTickets()
  }, [])

  useEffect(() => {
    setFilteredTickets(filteredTicketList)
  }, [filteredTicketList])

  useEffect(() => {
    setNumShowTickets(5)
  }, [stopsFilter, viewFilter])

  useEffect(() => {
    setFilteredTickets(filteredTicketList)
  }, [filteredTicketList, numShowTickets])

  const incShowTickets = () => {
    setNumShowTickets((prevNumShowTickets) => prevNumShowTickets + 5)
  }

  return (
    <>
      {dataState === DATA_STATES.FAIL && <h2 className={styles.nofilters}>Sorry the server didnt take off</h2>}
      {!tickets.length && filtersApplied && dataState === DATA_STATES.LOADED && (
        <h2 className={styles.nofilters}>Рейсов, подходящих под заданные фильтры, не найдено</h2>
      )}
      {filtersApplied ? (
        <>
          {dataState === DATA_STATES.LOADING && loaderRender(numShowTickets)}
          {dataState === DATA_STATES.LOADED && (
            <>
              <ul className={styles.list}>
                {filteredTickets.map((ticket, i) =>
                  i < numShowTickets ? (
                    <li key={i}>
                      <Ticket {...ticket} />
                    </li>
                  ) : null
                )}
              </ul>
              {numShowTickets < filteredTickets.length && (
                <button className={styles.morebtn} onClick={() => incShowTickets()}>
                  Показать еще 5 билетов
                </button>
              )}
            </>
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
