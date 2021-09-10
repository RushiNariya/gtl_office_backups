import { Document } from 'mongoose';
import Post from '@app/backend/src/models/post';
import User from '@app//backend/src/models/user';
import IPostSchema from '../interfaces/IPostSchema';
import IUserSchema from '../interfaces/IUserSchema';
import IError from '../interfaces/IError';

// import Logger from '@app/utils/logger';

// const logger = new Logger('Controller', 'user.js');

const getAll = async (currentPage: number, perPage: number): Promise<{totalItems: number, posts: (IPostSchema & Document<IPostSchema>)[] }> => {
  try {
    const totalItems: number = await Post.find().countDocuments();
    const posts: (IPostSchema & Document<IPostSchema>)[]  = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return {totalItems, posts};
  }
  catch (err: unknown) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const createOne = async (data: IPostSchema): Promise<{ post: IPostSchema & Document<IPostSchema>, user:  IUserSchema & Document<IUserSchema> }> => {
  try {
    const post: IPostSchema & Document<IPostSchema> = new Post(data);
    await post.save();
    const user: IUserSchema & Document<IUserSchema> = await User.findById(data.author);
    user.posts.push(post);
    await user.save();

    return { post, user };
  }
  catch (err: unknown) {
    throw new Error(`createOne Err: ${err}`);
  }
};

const getPostById = async (postId: string): Promise<(IPostSchema & Document<IPostSchema>)> => {
  try {
    const post: (IPostSchema & Document<IPostSchema>) = await Post.findById(postId);

    return post;
  }
  catch (err: unknown) {
    throw new Error(`getPostById Err: ${err}`);
  }
};

const deletePostById = async (postId: string, userId: string): Promise<void> => {
  try {
    const post: IPostSchema = await Post.findById(postId);

    if (!post) {
      const error: IError = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author.toString() !== userId) {
      const error: IError = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    await Post.findByIdAndRemove(postId);

    const user: IUserSchema = await User.findById(userId);
    user.posts.filter((post) => post._id !== postId);
    await user.save();
  }
  catch (err: unknown) {
    throw new Error(`deletePostById Err: ${err}`);
  }
};

const updatePostById = async (postId: string, userId: string, title: string, content: string): Promise<IPostSchema & Document<IPostSchema>> => {
  try {
    const post: IPostSchema & Document<IPostSchema> = await Post.findById(postId).populate('author');
    if (!post) {
      const error: IError = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    const postAuthor = post.author as IUserSchema & Document<IUserSchema>;
    if (postAuthor._id.toString() !== userId) {
      const error: IError = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    const result: IPostSchema & Document<IPostSchema> = await post.save();

    return result;
  }
  catch (err: unknown) {
    throw new Error(`updatePostById Err: ${err}`);
  }
  finally {
    //console.log('finally expected!);
  }
};


export {
  getAll,
  getPostById,
  updatePostById,
  createOne,
  deletePostById,

};