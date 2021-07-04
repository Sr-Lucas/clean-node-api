import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/testContentType', (request, response) => {
      response.send('')
    })

    await request(app).get('/testContentType').expect('content-type', /json/)
  })

  test('should return xml content type when forced', async () => {
    app.get('/testContentTypeXml', (request, response) => {
      response.type('xml')
      response.send('')
    })

    await request(app).get('/testContentTypeXml').expect('content-type', /xml/)
  })
})
