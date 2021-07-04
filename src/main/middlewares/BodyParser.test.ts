import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/testBodyParser', (request, response) => {
      response.send(request.body)
    })

    await request(app)
      .post('/testBodyParser')
      .send({ name: 'Lucas' })
      .expect({ name: 'Lucas' })
  })
})
