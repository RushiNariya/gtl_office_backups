import getBlogById from './getBlogById';
import getAllBLogs from './getAllBlogs';
import createNewBlog from './createBlog';
import getAllBlogsByCreator from './getBlogsByCreator';
import createNewCreator from './createCreator';
import getAllCreators from './getCreators';
import loginCurrentUser from './loginUser';
import toggleLikes from './toggleLike';
import addComments from './addComment';
import deleteBlogById from './deleteBlog';
import certifyBlogByModerator from './certifyBlogByModerator';

const resolvers = {
  getBlog: getBlogById,
  getBlogs: getAllBLogs,
  createBlog: createNewBlog,
  getBlogsByCreator: getAllBlogsByCreator,
  createCreator: createNewCreator,
  getCreators: getAllCreators,
  loginUser: loginCurrentUser,
  toggleLike: toggleLikes,
  addComment: addComments,
  deleteBlog: deleteBlogById,
  certifyBlog: certifyBlogByModerator,
};

export default resolvers;
