import { LoggerControllerDecorator } from './Logger'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

describe('Logger Decorator', () => {
  const makeController = (): Controller => {
    return new (class ControllerStub implements Controller {
      handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: 'any_name',
            email: 'any@mail.com',
            password: 'any_password'
          }
        }
        return new Promise((resolve) => resolve(httpResponse))
      }
    })()
  }

  const makeSut = () => {
    const controllerStub = makeController()
    const logControllerDecorator = new LoggerControllerDecorator(controllerStub)
    return { logControllerDecorator, controllerStub }
  }

  test('should call controller handle method', async () => {
    const { logControllerDecorator, controllerStub } = makeSut()
    const handleControllerSpy = jest.spyOn(controllerStub, 'handle')
    await logControllerDecorator.handle({
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    })
    expect(handleControllerSpy).toHaveBeenCalledWith({
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    })
  })
})
