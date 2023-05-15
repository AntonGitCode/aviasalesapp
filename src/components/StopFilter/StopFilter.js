import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { setStopsFilter, setFiltersApplied } from '../../redux/actions'
import { STOPS_FILTERS, checkboxes } from '../../constants'
import { CheckBox } from '../CheckBox/CheckBox'

import styles from './StopFilter.module.css'

function StopFilter({ setStopsFilter, setFiltersApplied }) {
  const [checkedItems, setChecked] = useState({ [STOPS_FILTERS.ALL]: true })

  useEffect(() => {
    const keys = Object.keys(checkedItems).filter((key) => checkedItems[key] && key !== STOPS_FILTERS.ALL)
    setStopsFilter(keys)
  }, [checkedItems, setStopsFilter])

  function handleChange(e) {
    const item = e.target.name
    const checked = e.target.checked

    let chkdItems = { ...checkedItems }
    let chkdKeysExceptAll = Object.keys(chkdItems).filter(
      (key) => key !== STOPS_FILTERS.ALL && checkedItems[key] === true
    )
    if (item === 'all' && !checked) return
    if (item === 'all' && checked && chkdKeysExceptAll.length) {
      setFiltersApplied(true)
      Object.keys(chkdItems).forEach((el) => {
        if (el !== 'all') chkdItems[el] = false
        else chkdItems[el] = true
      })
      setChecked(chkdItems)
    } else {
      if (!checked && chkdKeysExceptAll.length == 1) {
        setFiltersApplied(false)
        setChecked((prevChecked) => ({ ...prevChecked, [item]: checked }))
        return
      }
      setFiltersApplied(true)
      setChecked((prevChecked) => ({ ...prevChecked, all: false, [item]: checked }))
    }
  }

  return (
    <div className={styles.stopFilter}>
      <h2 className={styles.title}>Количество пересадок</h2>
      {checkboxes.map(({ name, key, label }) => {
        return <CheckBox key={key} name={name} checked={checkedItems[name]} onChange={handleChange} label={label} />
      })}
    </div>
  )
}

export default connect(null, { setStopsFilter, setFiltersApplied })(StopFilter)
