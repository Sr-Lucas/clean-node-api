import { Express } from 'express'

/** Middleware */
import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'

const middlewares = [bodyParser, cors]

export default (app: Express): void => {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}
