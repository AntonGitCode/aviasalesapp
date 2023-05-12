import React from 'react'

import styles from './CheckBox.module.css'

export function CheckBox({ type = 'checkbox', name, checked = false, onChange, label }) {
  return (
    <label className={styles.check}>
      <input type={type} name={name} checked={checked} onChange={onChange} className={styles.checkInput} />
      <span className={styles.checkBox}></span>
      {label}
    </label>
  )
}
