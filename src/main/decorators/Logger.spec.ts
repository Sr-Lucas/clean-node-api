import { LoggerControllerDecorator } from './Logger'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { serverError } from '../../presentation/helpers/HttpHelper'
import { LogErrorRepository } from '../../data/protocols/LogErrorRepository'

describe('Logger Decorator', () => {
  const makeLogErrorRepositoryStub = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
      async log(stack: string): Promise<void> {
        return new Promise((resolve) => resolve())
      }
    }
    return new LogErrorRepositoryStub()
  }

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

  interface SutTypes {
    sut: LoggerControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
  }

  const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = makeLogErrorRepositoryStub()
    const sut = new LoggerControllerDecorator(
      controllerStub,
      logErrorRepositoryStub
    )
    return { sut, controllerStub, logErrorRepositoryStub }
  }

  test('should call controller handle method', async () => {
    const { sut, controllerStub } = makeSut()
    const handleControllerSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle({
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

  test('should call controller handle method and return his httpResponse', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    })
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password'
      }
    })
  })

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logRepositorySpy = jest.spyOn(logErrorRepositoryStub, 'log')

    const error = new Error()
    error.stack = 'any_stack'
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      new Promise((resolve) => {
        resolve(serverError(error))
      })
    )

    await sut.handle({
      body: {
        name: 'any_name',
        email: 'any@mail.com',
        password: 'any_password',
        confirmationPassword: 'any_password'
      }
    })

    expect(logRepositorySpy).toHaveBeenCalledWith('any_stack')
  })
})
