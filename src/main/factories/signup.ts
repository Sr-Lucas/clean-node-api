import { SignUpController } from '../../presentation/controllers/Signup/SignUpController'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { DbAddAccount } from '../../data/usecases/add-account/DbAddAccount'
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter'
import { SALT } from '../../infra/cryptography/BcryptConstants'
import { AccountMongoRepository } from '../../infra/db/mongodb/account_repository/Account'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { LoggerControllerDecorator } from '../decorators/Logger'
import { LogMongoRepository } from '../../infra/db/mongodb/logger_repository/Logger'

export const makeSignupController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(SALT)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encrypter, accountRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  const logMongoResponse = new LogMongoRepository()
  return new LoggerControllerDecorator(signUpController, logMongoResponse)
}
