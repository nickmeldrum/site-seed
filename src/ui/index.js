import React from 'react'
import ReactDOM from 'react-dom'

import Hello from './components/Hello'

ReactDOM.hydrate(
  <Hello />,
  window.document.getElementById('container')
)
