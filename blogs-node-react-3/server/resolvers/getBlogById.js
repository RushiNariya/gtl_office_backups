import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

module.exports = async ({ id }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      if (!contextResult.role) {
        throw new Error('User is not authorized!');
      }
      const blog = await Blog.findById(id)
        .populate({
          path: 'creator',
          select: 'firstName lastName profession email',
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'creatorId',
            select: 'firstName lastName profession email',
          },
        });

      if (!blog) {
        throw new Error('Blog not found!');
      }
      return commonResponse('success', blog._doc, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
