import { Types, Document } from 'mongoose';
import IUserSchema from './IUserSchema';

export default interface IPostSchema {
  _id?: Types.ObjectId
  title?: string
  imageURL?: string
  content?: string
  author?: IUserSchema & Document<IUserSchema> | Types.ObjectId
}