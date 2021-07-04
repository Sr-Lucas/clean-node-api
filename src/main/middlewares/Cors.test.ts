import { response } from 'express'
import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('should enable cors', async () => {
    app.get('/testCors', (request, response) => {
      response.send()
    })

    await request(app)
      .get('/testCors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
