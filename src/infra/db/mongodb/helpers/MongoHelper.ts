require('dotenv/config')

import { Collection, MongoClient } from 'mongodb'
import path from 'node:path'

class MongoHelper {
  private client: MongoClient

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(`${process.env.MONGODB_URL}`, {
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
}

export default new MongoHelper()
