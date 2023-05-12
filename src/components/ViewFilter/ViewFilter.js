import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames' //

import { VIEW_FILTERS } from '../../constants'
import { setViewFilter } from '../../redux/actions'

import styles from './ViewFilter.module.css'

function ViewFilter({ setViewFilter, viewFilter }) {
  return (
    <>
      <div className={styles.viewFilter}>
        <button
          onClick={() => setViewFilter(VIEW_FILTERS.CHEAPEST)}
          className={cx(
            styles.filterBtn,
            styles.left,
            { [styles.active]: viewFilter === VIEW_FILTERS.CHEAPEST },
            { [styles.leftActive]: viewFilter === VIEW_FILTERS.CHEAPEST }
          )}
        >
          Самый дешевый
        </button>
        <button
          onClick={() => setViewFilter(VIEW_FILTERS.FASTEST)}
          className={cx(
            styles.filterBtn,
            styles.right,
            { [styles.active]: viewFilter === VIEW_FILTERS.FASTEST },
            { [styles.rightActive]: viewFilter === VIEW_FILTERS.FASTEST }
          )}
        >
          Самый быстрый
        </button>
      </div>
    </>
  )
}

export default connect((store) => ({ viewFilter: store.viewFilter, dataState: store.dataState }), { setViewFilter })(
  ViewFilter
)

//  (store) => ({ viewFilter: store.viewFilter, dataState: store.dataState }),
//  Первый аргумент в connect это функция,
//  которая принимает объект store и возвращает объект с полями viewFilter и dataState,
//  которые будут присвоены как props компонента ViewFilter.
//  используем состояние store для передачи данных в компонент
//
//  При изменении значения viewFilter в store,
//  компонент будет перерендериваться и получать обновленное значение через props.
//  А функция setViewFilter используется для изменения значения viewFilter
//  в store при клике на кнопки в компоненте.
