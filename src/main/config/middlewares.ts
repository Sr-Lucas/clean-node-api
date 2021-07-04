import { Express } from 'express'
import { bodyParser, cors, defaultContentType } from '../middlewares'

const middlewares = [bodyParser, cors, defaultContentType]

export default (app: Express): void => {
  middlewares.forEach((middleware) => {
    app.use(middleware)
  })
}
