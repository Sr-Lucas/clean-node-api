import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
  AddAccountRepository
} from './DbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const passwordEncrypted = await this.encrypter.encrypt(accountData.password)

    const account = await this.addAccountRepository.add({
      ...accountData,
      password: passwordEncrypted
    })

    return account
  }
}
