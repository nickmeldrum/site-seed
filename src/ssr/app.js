import express from 'express'

import renderedString from 'react-render'

const router = express.Router()

router.use((req, res) => res.render('index', { content: renderedString }))

module.exports = router
