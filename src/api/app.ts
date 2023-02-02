import 'express-async-errors'
import express from 'express'
import { userRouter } from '../routes/userRouter'
import { errorMiddleware } from '../middlewares/errorMiddleware'

class App {
  public app: express.Express

  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  private config (): void {
    this.app.use(express.json())
  }

  private routes (): void {
    this.app.get('/', (req, res) => res.status(200).json({ message: 'ok' }))
    this.app.use('/users', userRouter)
    this.app.use(errorMiddleware)
  }

  public start (PORT: number): void {
    this.app.listen(PORT, () => { console.log(`Server running on PORT: ${PORT}`) })
  }
}

export { App }

// servidor exportado para os testes
export const { app } = new App()
