import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'

import { getTickets } from '../../redux/actions'
import { getTicketByStopsAndViewFilter } from '../../redux/getTicketsFiltered'
import { DATA_STATES } from '../../constants'
import { Ticket } from '../Ticket/Ticket'
import { Loader } from '../Loader/Loader'

import styles from './TicketList.module.css'

function loaderRender(num) {
  let loaderArray = []
  Array(num)
    .fill()
    .forEach(() => {
      loaderArray = loaderArray.concat(<Loader key={uuidv4()} />)
    })
  return loaderArray
}

function TicketList({ tickets, dataState, getTickets, filtersApplied }) {
  useEffect(() => {
    getTickets()
  }, [])
  return (
    <>
      {filtersApplied ? (
        <>
          {dataState === DATA_STATES.LOADING && loaderRender(5)}
          <ul className={styles.list}>
            {dataState === DATA_STATES.LOADED &&
              tickets.map((ticket, i) =>
                i < 5 ? (
                  <li key={uuidv4()}>
                    <Ticket {...ticket} />
                  </li>
                ) : null
              )}
          </ul>
        </>
      ) : (
        <h2 className={styles.nofilters}>Фильтры не заданы</h2>
      )}
    </>
  )
}

function mapStateToProps(store) {
  return {
    tickets: getTicketByStopsAndViewFilter(store),
    dataState: store.dataState,
    viewFilter: store.viewFilter,
    stopsFilter: store.stopsFilter,
    filtersApplied: store.filtersApplied,
  }
}

export default connect(mapStateToProps, { getTickets })(TicketList)
