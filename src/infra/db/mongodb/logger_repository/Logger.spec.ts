require('dotenv/config')

import MongoHelper from '../helpers/MongoHelper'
import { LogMongoRepository } from './Logger'

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGODB_TEST_URL}`)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection?.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    const count = await sut.logError('any_error')
    expect(count).toBe(1)
  })
})
