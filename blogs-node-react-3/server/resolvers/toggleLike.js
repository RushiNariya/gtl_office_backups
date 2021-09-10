import Creator from '../Model/Creator';
import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

const roles = ['Admin', 'User', 'Author'];

module.exports = async ({ input }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      const creatorRole = contextResult.role;

      if (!roles.includes(creatorRole)) {
        throw new Error('User is not authorized!');
      }

      const creatorId = contextResult.creatorId;
      const { blogId } = input;
      const creator = await Creator.findOne({ _id: creatorId });
      if (!creator) {
        throw new Error('user not found');
      }
      const blog = await Blog.findById(blogId);
      if (!blog) {
        throw new Error('blog not found');
      }
      if (blog && blog.likes.find((like) => like._id.toString() === creatorId.toString())) {
        blog.likes = blog.likes.filter((like) => like._id.toString() !== creatorId.toString());
      } else {
        blog.likes.push(creatorId);
      }
      const updatedBlog = await blog.save();
      return commonResponse('success', updatedBlog, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};