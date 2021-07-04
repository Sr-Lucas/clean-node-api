import { Express } from 'express'

/** Middleware */
import { bodyParser } from '../middlewares/BodyParser'
import { cors } from '../middlewares/Cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
