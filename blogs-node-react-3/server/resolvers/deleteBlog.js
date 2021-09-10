import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

module.exports = async ({ id }, context) => {
  try {
    // console.log(id);
    const contextResult = await context();
    if (contextResult) {
      if (!contextResult.role) {
        throw new Error('User is not authorized!');
      }

      if (contextResult.role !== 'Author') {
        throw new Error('User is not authorized!');
      }

      const blog = await Blog.findById(id);

      if (!blog) {
        throw new Error('Blog not found!');
      }

      blog.status = 'deleted';
      

      const updatedBlog = await blog.save();
      return commonResponse('deleted', updatedBlog, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
