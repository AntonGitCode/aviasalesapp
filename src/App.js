import React from 'react'

import TicketList from './components/TicketList/TicketList'
import ViewFilter from './components/ViewFilter/ViewFilter'
import StopFilter from './components/StopFilter/StopFilter'
import styles from './App.module.css'
import { ReactComponent as Logo } from './img/logo.svg'

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
