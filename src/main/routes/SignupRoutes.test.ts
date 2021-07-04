require('dotenv/config')

import request from 'supertest'
import MongoHelper from '../../infra/db/mongodb/helpers/MongoHelper'
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(`${process.env.MONGODB_TEST_URL}`)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas',
        email: 'lucastsantos.developer@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
