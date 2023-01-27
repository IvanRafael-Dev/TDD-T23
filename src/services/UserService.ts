import { IUserModel } from '../models/interfaces/IUserModel'
import { NewUserBody, IUserService, UserModel } from './interfaces/IUserService'

export class UserService implements IUserService {
  private readonly _userModel: IUserModel

  constructor (userModel: IUserModel) {
    this._userModel = userModel
  }

  async create (user: NewUserBody): Promise<Omit<UserModel, 'password'>> {
    const result = await this._userModel.create(user)
    const { password: _, ...userWithoutPass } = result
    return userWithoutPass
  }
}
