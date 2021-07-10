import { AccountModel } from '../../../../domain/models/Account'
import { Collection, MongoClient } from 'mongodb'
import { ServerError } from '../../../../presentation/errors/ServerError'

class MongoHelper {
  private client: MongoClient | null
  private uri: string | null

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect(): Promise<void> {
    if (this.client && this.client.isConnected()) {
      await this.client.close()
    }
    this.client = null
  }

  async getCollection(name: string): Promise<Collection | null> {
    if (!(this.client && this.client.isConnected())) {
      console.log('entrou')
      if (!this.uri) throw new ServerError()
      await this.connect(this.uri)
    }

    return this.client !== null ? this.client.db().collection(name) : null
  }

  mapUnderscoredId(result: any): AccountModel {
    const { _id: id, ...resultWithoutId } = result
    return { id, ...resultWithoutId }
  }
}

export default new MongoHelper()
