import { Schema, model, Document } from 'mongoose';
import IPostSchema from '../interfaces/IPostSchema';

const postSchema = new Schema<IPostSchema & Document<IPostSchema>>(
  {
    title: {
      type: String,
      required: true
    },
    imageURL: {
      type: String
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: Schema?.Types?.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Post = model<IPostSchema & Document<IPostSchema>>('Post', postSchema);

export default Post;