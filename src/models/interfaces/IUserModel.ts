import { UserModelData } from './../../services/interfaces/IUserService'
import { NewUserBody } from '../../services/interfaces/IUserService'

export interface IUserModel {
  create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>>
  findByEmail (email: string): Promise<UserModelData | null>
}
