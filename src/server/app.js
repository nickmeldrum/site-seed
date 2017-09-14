import path from 'path'
import express from 'express'
import expressHandlebars from 'express-handlebars'

const app = express()

app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'))

app.get((req, res) => res.send('dis dynamic boyyeeee'))

app.use((req, res) => {
    res.render('index', { route: req.url })
})

export default app
