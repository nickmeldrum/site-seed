import path from 'path'
import expressHandlebars from 'express-handlebars'

export default app => {
  app.engine('handlebars', expressHandlebars())
  app.set('view engine', 'handlebars')
  app.set('views', path.join(__dirname, '/views'))
}
