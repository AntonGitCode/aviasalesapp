import React from 'react'
import addMinutes from 'date-fns/addMinutes'

import { dateFormat } from '../../utils/formatTime'

import styles from './TicketData.module.css'

function suffix(number) {
  const suffixes = ['пересадка', 'пересадки', 'пересадок']
  const n = Math.abs(number) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return suffixes[2]
  if (n1 > 1 && n1 < 5) return suffixes[1]
  if (n1 === 1) return suffixes[0]
  return suffixes[2]
}

function calcDuration(m) {
  const hours = Math.floor(m / 60)
  const minutes = m % 60
  return [hours, minutes]
}

export function TicketData({ segment }) {
  const { origin, destination, date, stops, duration } = segment
  const dateDeparture = new Date(date)
  const [hours, minutes] = calcDuration(duration)
  const durationDate = new Date(2020, 0, 1, hours, minutes)
  const destinationDate = addMinutes(dateDeparture, duration)

  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <p className={styles.desc}>
          {origin} - {destination}
        </p>
        <p className={styles.info}>
          {dateFormat(dateDeparture, ':')} - {dateFormat(destinationDate, ':')}
        </p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>В пути</p>
        <p className={styles.info}>{dateFormat(durationDate)}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.desc}>
          {stops.length} {suffix(stops.length)}
        </p>
        <p className={styles.info}>{stops.join(', ')}</p>
      </div>
    </div>
  )
}
