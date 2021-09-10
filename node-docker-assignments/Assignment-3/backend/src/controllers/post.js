import { validationResult } from 'express-validator';

// import Post from '@app/models/post';
// import User from '@app/models/user';

import {
  getAll,
  createOne,
  getPostById,
  updatePostById,
  deletePostById,
} from '@app/services/post';
// const clearImage = filePath => {
//   let fP = filePath;
//   fP = path.join(__dirname, '..', filePath);
//   // eslint-disable-next-line security/detect-non-literal-fs-filename
//   fs.unlink(fP, err => console.log(err));
// };

const getPosts = async (req, res) => {
  const currentPage = req?.query?.page || 1;
  const perPage = 2;
  try {

    const {totalItems, posts} = getAll(currentPage, perPage);

    res.status(200).json({
      message: `${posts.length} posts fetched`,
      posts: posts,
      totalItems: totalItems
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.StatusCode).json({
      err: err.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const title = req?.body?.title;
    const content= req?.body?.content;
    if (!title || !content){
      throw new Error('title and content is required!!');
    }
    // const { title, content } = req?.body;
    const data = {
      title,
      content,
      author: req.userId
    };
    const { post, user } =await createOne(data);
    res.status(201).json({
      message: 'Post created successfully!',
      post,
      author: { _id: user._id, name: user.name }
    });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.StatusCode).json({
      err: err.message,
    });
  }
};

const getPost = async (req, res) => {
  const postId = req?.params?.postId;
  try {
    const post = await getPostById(postId);
    if (!post) {
      const error = new Error('Could not find post!!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', post });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.StatusCode).json({
      err: err.message,
    });
  }
};

const updatePost = async (req, res) => {
  const postId = req?.params?.postId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  try {
    const title = req?.body?.title;
    const content= req?.body?.content;

    if (!title || !content){
      throw new Error('title and content is required!!');
    }
    const result = await updatePostById(postId, req.userId, title, content);
    res.status(200).json({ message: 'Post updated!', post: result });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.StatusCode).json({
      err: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  const postId = req?.params?.postId;
  try {
    await deletePostById(postId, req?.userId);
    res.status(200).json({ message: 'Deleted post' });
  }
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    res.status(err.StatusCode).json({
      err: err.message,
    });
  }
};

export {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};