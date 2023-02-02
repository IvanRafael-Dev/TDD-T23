import { UserSequelizeRepository } from './../repository/sequelize/UserSequelizeRepository'
import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { validateBody } from '../middlewares/validateBody'
import { UserService } from '../services/UserService'
import { UserModel } from '../models/UserModel'

const router = Router()

const userSequelizeRepository = new UserSequelizeRepository()
const userModel = new UserModel(userSequelizeRepository)
const userService = new UserService(userModel)
const userController = new UserController(userService)

router.post('/', validateBody, (req, res) => userController.create(req, res))

export { router as userRouter }
