import { types } from '../actions'
import initialState from './initial-state'

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.UPDATE_NAME:
      return Object.assign({}, initialState, {name: action.payload})
    default:
      return state
  }
}
