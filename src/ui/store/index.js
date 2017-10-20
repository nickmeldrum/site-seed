import React from 'react'
import { Provider } from 'react-redux'

import store from './create-store'

export default store

export const wrapComponentInStore = Component =>
  <Provider store={store}>
    <Component />
  </Provider>
