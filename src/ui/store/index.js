import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducers from './reducers'

export const store = createStore(reducers)

export const wrapComponentInStore = Component =>
  <Provider store={store}>
    <Component />
  </Provider>
