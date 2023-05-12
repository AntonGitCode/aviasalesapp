import React from 'react'

import { TicketData } from '../TicketData/TicketData'

import styles from './Ticket.module.css'

function numberPrettierSpaces(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function Ticket({ price, carrier, segments }) {
  const _carrierLogoUrl = 'https://pics.avs.io/99/36/'
  const _currensySign = '\u20BD'

  const [departure, arrival] = segments

  return (
    <div className={styles.ticket}>
      <div className={styles.topRow}>
        <p className={styles.price}>
          {numberPrettierSpaces(price)} {_currensySign}
        </p>
        <img src={`${_carrierLogoUrl}${carrier}.png`} alt="carrier logo" className={styles.logo} />
      </div>
      <TicketData segment={departure} />
      <TicketData segment={arrival} />
    </div>
  )
}
