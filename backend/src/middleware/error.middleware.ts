import { ErrorRequestHandler } from 'express'
import { config } from '../config/env'

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
    return
  }

  if (config.nodeEnv === 'development') {
    console.error(err)
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Internal Server Error',
      stack: err instanceof Error ? err.stack : undefined,
    })
    return
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
}
