import { ServerError } from '../errors/ServerError'
import { HttpResponse } from '../protocols/Http'

export const successRequest = (body: [Object] | Object | []): HttpResponse => ({
  statusCode: 200,
  body
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})
