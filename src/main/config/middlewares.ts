import { Express } from 'express'

/** Middleware */
import { bodyParser } from '../middlewares/BodyParser'

export default (app: Express): void => {
  app.use(bodyParser)
}
