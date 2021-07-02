import bcrypt from 'bcrypt'
import { SALT } from './BcryptConstants'
import { BcryptAdapter } from './BcryptAdapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise<string>((resolve) => {
      resolve('hash')
    })
  }
}))

describe('BcryptAdapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('should return a hash on success', async () => {
    const sut = new BcryptAdapter(SALT)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
