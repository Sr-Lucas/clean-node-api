import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel
} from './DbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    const passwordEncrypted = await this.encrypter.encrypt(account.password)
    return await new Promise<AccountModel>((resolve) =>
      resolve({
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: passwordEncrypted
      })
    )
  }
}
