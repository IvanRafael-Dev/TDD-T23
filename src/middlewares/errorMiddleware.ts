import { ErrorRequestHandler } from 'express'

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ error: err.message })
  }
  return res.status(500).json({ error: err.message })
}
