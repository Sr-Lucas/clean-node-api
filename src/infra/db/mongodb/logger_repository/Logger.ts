import { LogErrorRepository } from '../../../../data/protocols/LogErrorRepository'
import MongoHelper from '../helpers/MongoHelper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<number> {
    const errorCollection = await MongoHelper.getCollection('errors')
    const result = await errorCollection?.insertOne({
      stack,
      date: new Date()
    })

    return result?.insertedCount ?? 0
  }
}
