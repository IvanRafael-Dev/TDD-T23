import { UserModel, NewUserBody } from '../../services/interfaces/IUserService'

export interface IUserModel {
  create (user: NewUserBody): Promise<UserModel>
}
