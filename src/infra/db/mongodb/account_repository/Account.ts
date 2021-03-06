import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository'
import { AccountModel } from '../../../../domain/models/Account'
import { AddAccountModel } from '../../../../domain/usecases/AddAccount'
import MongoHelper from '../helpers/MongoHelper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection?.insertOne(accountData)
    return MongoHelper.mapUnderscoredId(result?.ops[0])
  }
}
