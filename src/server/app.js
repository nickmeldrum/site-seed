import express from 'express'

const app = express()

app.get('/dynamic', (req, res) => res.send('dis dynamic boyyeeee'))

export default app
