import { Express } from 'express'

/** Middleware */
import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'
import { defaultContentType } from '../middlewares/ContentType'

const middlewares = [bodyParser, cors, defaultContentType]

export default (app: Express): void => {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}
