export interface UserModelData {
  id: number
  email: string
  password: string
  username: string
}

export interface NewUserBody extends Omit<UserModelData, 'password'> {
  email: string
  password: string
  username: string
}

export interface IUserService {
  create (user: NewUserBody): Promise<Omit<UserModelData, 'password'>>
}
