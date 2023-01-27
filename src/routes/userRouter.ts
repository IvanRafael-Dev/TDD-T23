import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { validateBody } from '../middlewares/validateBody'
import { UserService } from '../services/UserService'
import { UserModelGeneric } from '../models/UserModel'

const router = Router()

const userModel = new UserModelGeneric()
const userService = new UserService(userModel)
const userController = new UserController(userService)

router.post('/', validateBody, (req, res) => userController.create(req, res))

export { router as userRouter }
