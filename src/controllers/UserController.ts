import { type Request, type Response } from 'express'
import { type IUserService } from '../services/interfaces/IUserService'

export class UserController {
  private readonly _userService: IUserService

  constructor (userService: IUserService) {
    this._userService = userService
  }

  async create (req: Request, res: Response): Promise<Response | void> {
    const result = await this._userService.create(req.body)
    return res.status(201).json(result)
  }
}
