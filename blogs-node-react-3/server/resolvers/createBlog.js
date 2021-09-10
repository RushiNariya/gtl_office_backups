import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

module.exports = async ({ input }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      // console.log(contextResult);
      if (contextResult.role !== 'Author') {
        throw new Error('User is not authorized!');
      }
      const { blogName, stack, description, creator, status } = input;
      const blog = new Blog({
        creator: contextResult.creatorId,
        blogName: blogName,
        stack: stack,
        likes: [],
        comments: [],
        description: description,
        status: status,
      });
      const newBlog = await blog.save();
      return commonResponse('created', newBlog, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
