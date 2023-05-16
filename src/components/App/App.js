import React from 'react'

import TicketList from '../TicketList/TicketList'
import ViewFilter from '../ViewFilter/ViewFilter'
import StopFilter from '../StopFilter/StopFilter'
import { ReactComponent as Logo } from '../../img/logo.svg'

import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <Logo className={styles.logo} />
      <div className={styles.inner}>
        <StopFilter />
        <div>
          <ViewFilter />
          <TicketList />
        </div>
      </div>
    </div>
  )
}
