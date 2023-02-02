import { IUserRepository } from '../repository/interfaces/IUserRepository'
import { NewUserBody, UserModelData } from '../services/interfaces/IUserService'
import { IUserModel } from './interfaces/IUserModel'

export class UserModel implements IUserModel {
  private readonly userRepository: IUserRepository

  constructor (userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>> {
    const result = await this.userRepository.create(user)
    return result
  }

  async findByEmail (email: string): Promise<UserModelData | null> {
    const user = await this.userRepository.findByEmail(email)
    return user
  }
}
