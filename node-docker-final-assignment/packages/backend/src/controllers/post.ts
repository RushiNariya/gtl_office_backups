import { Result, ValidationError, validationResult } from 'express-validator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

// import Post from '@app/models/post';
// import User from '@app/models/user';

import {
  getAll,
  createOne,
  getPostById,
  updatePostById,
  deletePostById,
} from '@app/backend/src/services/post';
import IPostSchema from '../interfaces/IPostSchema';
import IUserSchema from '../interfaces/IUserSchema';
import IError from '../interfaces/IError';
import { Response } from 'express';
import IRequest from '../interfaces/IRequest';
import IResType from '../interfaces/IResType';
import User from '../models/user';
// const clearImage = filePath => {
//   let fP = filePath;
//   fP = path.join(__dirname, '..', filePath);
//   // eslint-disable-next-line security/detect-non-literal-fs-filename
//   fs.unlink(fP, err => console.log(err));
// };

const getPosts = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  const currentPage: number = parseInt(req?.query?.page as string, 10) || 1;
  const perPage = 2;
  try {
    const {
      totalItems,
      posts,
    }: {
      totalItems: number;
      posts: (IPostSchema & Document<IPostSchema>)[];
    } = await getAll(currentPage, perPage);

    res.status(200).json({
      message: `${posts.length} posts fetched`,
      posts: posts,
      totalItems: totalItems,
    });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({
      err: error.message,
    });
  }
};

const createPost = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  try {
    const title: string = req?.body?.title;
    const content: string = req?.body?.content;
    if (!title || !content) {
      throw new Error('title and content is required!!');
    }
    // const { title, content } = req?.body;
    const data: IPostSchema = {
      title,
      content,
      author: mongoose.Types.ObjectId(req.userId),
    };
    const {
      post,
      user,
    }: {
      post: IPostSchema & Document<IPostSchema>;
      user: IUserSchema & Document<IUserSchema>;
    } = await createOne(data);
    res.status(201).json({
      message: 'Post created successfully!',
      post,
      author: new User({ _id: user._id, name: user.name }),
    });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({
      err: error.message,
    });
  }
};

const getPost = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  const postId: string = req?.params?.postId;
  try {
    const post: (IPostSchema & Document<IPostSchema>) = await getPostById(postId);
    if (!post) {
      const error: IError = new Error('Could not find post!!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', post });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({
      err: error.message,
    });
  }
};

const updatePost = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  const postId: string = req?.params?.postId;
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    const error: IError = new Error(
      'Validation failed, entered data is incorrect.'
    );
    error.statusCode = 422;
    throw error;
  }

  try {
    const title: string = req?.body?.title;
    const content: string = req?.body?.content;

    if (!title || !content) {
      throw new Error('title and content is required!!');
    }
    const result: IPostSchema & Document<IPostSchema> = await updatePostById(
      postId,
      req.userId,
      title,
      content
    );
    res.status(200).json({ message: 'Post updated!', post: result });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({
      err: error.message,
    });
  }
};

const deletePost = async (
  req: IRequest,
  res: Response | IResType
): Promise<void> => {
  const postId: string = req?.params?.postId;
  try {
    await deletePostById(postId, req?.userId);
    res.status(200).json({ message: 'Deleted post' });
  }
  catch (err: unknown) {
    const error: IError = err as IError;
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({
      err: error.message,
    });
  }
};

export { getPosts, createPost, getPost, updatePost, deletePost };
