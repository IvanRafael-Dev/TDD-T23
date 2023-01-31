import { NextFunction, Request, Response } from 'express'

export const validateBody = (req: Request, res: Response, next: NextFunction): Response | void => {
  const requiredFields = ['email', 'password', 'username']
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).json({ error: `o campo ${field} é obrigatório` })
    }
  }
  next()
}
