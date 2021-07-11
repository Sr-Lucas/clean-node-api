import { AccountModel } from '../../domain/models/Account'

export interface LogErrorRepository {
  log: (stack: string) => Promise<void>
}
