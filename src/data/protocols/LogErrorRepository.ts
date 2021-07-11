import { AccountModel } from '../../domain/models/Account'

export interface LogErrorRepository {
  logError: (stack: string) => Promise<number>
}
