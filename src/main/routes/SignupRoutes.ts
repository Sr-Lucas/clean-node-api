import { response, Router } from 'express'
import { makeSignupController } from '../factories/signup'
import { adaptRoute } from '../adapters/ExpressRouteAdapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
