import { Document } from 'mongoose';
import IPostSchema from './IPostSchema';
import IUserSchema from './IUserSchema';

export interface IInput {
  post?: (IPostSchema & Document<IPostSchema>);
  posts?: (IPostSchema & Document<IPostSchema>)[];
  message?: string;
  err?: string;
  totalItems?: number;
  author?: (IUserSchema & Document<IUserSchema>);
  error?: string;
  ok?: boolean;
  status?: string;
  users?: (IUserSchema & Document<IUserSchema>)[];
  result?: (IUserSchema & Document<IUserSchema>) | (IUserSchema & Document<IUserSchema>)[];
  img?: string;
}