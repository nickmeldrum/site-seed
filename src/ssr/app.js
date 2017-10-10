import express from 'express'

const router = express.Router()

router.use((req, res) => {
  res.render('index', { route: req.url, data: 'foobar' })
})

module.exports = router
