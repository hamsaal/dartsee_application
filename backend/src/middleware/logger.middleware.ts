import { RequestHandler } from 'express'

export const loggerMiddleware: RequestHandler = (req, res, next): void => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`)
  })

  next()
}
