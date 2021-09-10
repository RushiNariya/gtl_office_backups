import IPostSchema from './IPostSchema';
import { Document, Types } from 'mongoose';

export default interface IUserSchema extends Document {
  _id?: Types.ObjectId;
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  img?: string;
  posts?: (IPostSchema & Document<IPostSchema>)[];
}