import { Document } from 'mongoose';
import IPostSchema from './IPostSchema';

export default interface IGetAll {
  totalItems: number;
  posts: (IPostSchema & Document<IPostSchema>)[];
}
