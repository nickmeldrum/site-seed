import { handleActions } from 'redux-actions'

import initialState from './initial-state'
import { UPDATE_NAME } from '../actions/types'

export default handleActions({
  [UPDATE_NAME]: (state, action) => state.set('name', action.payload),
}, initialState)
