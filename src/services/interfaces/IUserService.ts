export interface UserModel {
  id: number
  email: string
  password: string
  username: string
}

export interface NewUserBody extends Omit<UserModel, 'password'> {
  email: string
  password: string
  username: string
}

export interface IUserService {
  create (user: NewUserBody): Promise<Omit<UserModel, 'password'>>
}
