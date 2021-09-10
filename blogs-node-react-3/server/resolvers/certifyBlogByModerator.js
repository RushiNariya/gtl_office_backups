import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

module.exports = async ({ id, status }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      if (!contextResult.role) {
        throw new Error('User is not authorized!');
      }

      if (contextResult.role !== 'Moderator') {
        throw new Error('User is not authorized!');
      }

      const blog = await Blog.findById(id);

      if (!blog) {
        throw new Error('Blog not found!');
      }

      blog.status = status;

      const updatedBlog = await blog.save();
      // console.log(blog);
      // return blog._doc;
      return commonResponse('certified', updatedBlog, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
    // console.log(error);
  }
};
