import Post from '@app/models/post';
import User from '@app/models/user';

// import Logger from '@app/utils/logger';

// const logger = new Logger('Controller', 'user.js');

const getAll = async (currentPage, perPage) => {
  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate('author')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return {totalItems, posts};
  }
  catch (err) {
    throw new Error(`getAll Err: ${err}`);
  }
};

const createOne = async (data) => {
  try {
    const post = new Post(data);
    await post.save();
    const user = await User.findById(data.author);
    user.posts.push(post);
    await user.save();

    return { post, user };
  }
  catch (err) {
    throw new Error(`createOne Err: ${err}`);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);

    return post;
  }
  catch (err) {
    throw new Error(`getPostById Err: ${err}`);
  }
};

const deletePostById = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author.toString() !== userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    await Post.findByIdAndRemove(postId);

    const user = await User.findById(userId);
    user.posts.pull(postId);
    await user.save();
  }
  catch (err) {
    throw new Error(`deletePostById Err: ${err}`);
  }
};

const updatePostById = async (postId, userId, title, content) => {
  try {
    const post = await Post.findById(postId).populate('author');
    if (!post) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    if (post.author._id.toString() !== userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }

    post.title = title;
    post.content = content;
    const result = await post.save();

    return result;
  }
  catch (err) {
    throw new Error(`updatePostById Err: ${err}`);
  }
};


export {
  getAll,
  getPostById,
  updatePostById,
  createOne,
  deletePostById,

};