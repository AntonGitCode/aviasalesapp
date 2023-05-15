import { combineReducers } from 'redux'

import { tickets } from './tickets'
import { dataState } from './dataState'
import { viewFilter } from './viewFilter'
import { stopsFilter } from './stopsFilter'
import { filtersApplied } from './filtersApplied'

export const rootReducer = combineReducers({ tickets, dataState, viewFilter, stopsFilter, filtersApplied })
