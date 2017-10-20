import { createStore } from 'redux'

import enhancer from './enhancer'
import reducers from './reducers'

export default createStore(reducers, enhancer)
