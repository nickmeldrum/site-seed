import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import devTools from './dev-tools'
import reducers from './reducers'

const middleware = []

const enhancer = compose(applyMiddleware(...middleware), devTools)

export const store = createStore(reducers, enhancer)

export const wrapComponentInStore = Component =>
  <Provider store={store}>
    <Component />
  </Provider>
