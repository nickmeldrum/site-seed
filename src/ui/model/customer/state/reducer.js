import { UPDATE_NAME } from '../actions/types'
import initialState from './initial-state'

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      return Object.assign({}, initialState, {name: action.name})
    default:
      return state
  }
}
