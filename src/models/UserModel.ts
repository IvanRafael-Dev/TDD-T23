import { NewUserBody, UserModel } from '../services/interfaces/IUserService'
import { IUserModel } from './interfaces/IUserModel'

export class UserModelGeneric implements IUserModel {
  async create (user: NewUserBody): Promise<UserModel> {
    console.log('model chamada')

    return {
      id: 1,
      password: 'any_pass',
      email: 'any_email',
      username: 'any_username'
    }
  }
}
