import { AccountModel } from '../../../../domain/models/Account'
import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  private client: MongoClient

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    await this.client.close()
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }

  mapUnderscoredId(result: any): AccountModel {
    const { _id: id, ...resultWithoutId } = result
    return { id, ...resultWithoutId }
  }
}

export default new MongoHelper()
