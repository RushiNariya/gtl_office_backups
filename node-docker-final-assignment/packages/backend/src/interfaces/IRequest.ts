import { Request } from 'express';

export default interface IRequest extends Request {
  userId?: string
  user?: { id: string }
}