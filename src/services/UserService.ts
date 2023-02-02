import { ConflictError } from '../errors/conflict-error'
import { IUserModel } from '../models/interfaces/IUserModel'
import { NewUserBody, IUserService, UserModelData } from './interfaces/IUserService'

export class UserService implements IUserService {
  private readonly _userModel: IUserModel

  constructor (userModel: IUserModel) {
    this._userModel = userModel
  }

  async create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>> {
    const isUser = await this._userModel.findByEmail(user.email)
    if (isUser) {
      throw new ConflictError('O email já está cadastrado')
    }
    const result = await this._userModel.create(user)
    return result
  }
}
