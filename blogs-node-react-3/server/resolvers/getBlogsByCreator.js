import Blog from '../Model/Blog';
import commonResponse from '../helper/index';

module.exports = async ({ page, limits, search }, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {
      if (contextResult.role !== 'Author') {
        throw new Error('User is not authorized!');
      }

      let blogCount, blogs;
      let status = ['active', 'reject'];
      const perPage = parseInt(limits);
      const pageNumber = parseInt(page);
      if (search === 'All') {
        blogs = await Blog.find({
          creator: contextResult.creatorId,
          status: { $in: status },
        })
          .sort({
            blogName: 1,
          })
          .skip((pageNumber - 1) * perPage)
          .limit(perPage)
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

        blogCount = await Blog.countDocuments({
          creator: contextResult.creatorId,
          status: { $in: status },
        });
      } else {
        blogs = await Blog.find({
          creator: contextResult.creatorId,
          stack: search,
          status: { $in: ['active', 'reject'] },
        })
          .sort({
            blogName: 1,
          })
          .skip((pageNumber - 1) * perPage)
          .limit(perPage)
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

        blogCount = await Blog.countDocuments({
          creator: contextResult.creatorId,
          stack: search,
          status: { $in: ['active', 'reject'] },
        });
      }

      if (!blogs || blogCount === 0) {
        throw new Error('Blogs not Found!');
      }
      console.log(blogs);
      return commonResponse(
        'success',
        { blogs: blogs, totalBlog: blogCount },
        null
      );
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};
