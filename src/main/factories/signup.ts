import { SignUpController } from '../../presentation/controllers/Signup/SignUpController'
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter'
import { DbAddAccount } from '../../data/usecases/add-account/DbAddAccount'
import { BcryptAdapter } from '../../infra/cryptography/BcryptAdapter'
import { SALT } from '../../infra/cryptography/BcryptConstants'
import { AccountMongoRepository } from '../../infra/db/mongodb/account_repository/Account'

export const makeSignupController = (): SignUpController => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const encrypter = new BcryptAdapter(SALT)
  const accountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(encrypter, accountRepository)
  const signUpController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )

  return signUpController
}
