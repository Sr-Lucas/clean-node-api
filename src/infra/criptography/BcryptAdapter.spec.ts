import bcrypt from 'bcrypt'
import { SALT } from './BcryptConstants'
import { BcryptAdapter } from './BcryptAdapter'

describe('BcryptAdapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(SALT)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
