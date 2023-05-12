import { combineReducers } from 'redux'

import { tickets } from './tickets'
import { dataState } from './dataState'
import { viewFilter } from './viewFilter'
import { stopsFilter } from './stopsFilter'

export const rootReducer = combineReducers({ tickets, dataState, viewFilter, stopsFilter })
