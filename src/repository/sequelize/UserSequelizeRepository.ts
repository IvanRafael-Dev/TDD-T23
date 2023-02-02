import { NewUserBody, UserModelData } from '../../services/interfaces/IUserService'
import { User } from './../../database/models/User'
import { IUserRepository } from './../interfaces/IUserRepository'

export class UserSequelizeRepository implements IUserRepository {
  constructor (private readonly userModel = User) {}

  async create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>> {
    const newUser = await this.userModel.create({ ...user })
    const { password: _, ...userWithoutPass } = newUser
    return userWithoutPass
  }

  async findByEmail (email: string): Promise<UserModelData | null> {
    const user = await this.userModel.findOne({ where: { email } })
    return user
  }
}
