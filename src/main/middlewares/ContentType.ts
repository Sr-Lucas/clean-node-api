import { Request, Response, NextFunction } from 'express'

export const defaultContentType = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.type('json')

  next()
}
