import { NewUserBody, UserModelData } from '../../services/interfaces/IUserService'

export interface IUserRepository {
  create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>>
  findByEmail (email: string): Promise<UserModelData | null>
}
