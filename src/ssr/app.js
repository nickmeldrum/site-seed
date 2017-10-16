import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import Hello from '../ui/components/Hello'

const router = express.Router()

router.use((req, res) => {
  res.render('index', { content: ReactDOMServer.renderToString(
    <Hello />
  )})
})

module.exports = router
