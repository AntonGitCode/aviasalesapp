import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

import { getTickets } from '../../redux/fetchApi'
// import { DATA_STATES, VIEW_FILTERS, STOPS_FILTERS } from '../../constants'
import { DATA_STATES } from '../../constants'
import { Ticket } from '../Ticket/Ticket'
import { Loader } from '../Loader/Loader'
import { getTicketByStopsAndViewFilter } from '../../utils/sortTickets'

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

  useEffect(() => {
    getTickets()
  }, [])

  useEffect(() => {
    setNumShowTickets(5)
  }, [stopsFilter, viewFilter])

  useEffect(() => {
    setFilteredTickets(getTicketByStopsAndViewFilter(tickets, stopsFilter, viewFilter))
  }, [tickets, stopsFilter, viewFilter, numShowTickets])

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
                    <li key={ticket.segments[0].date}>
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
