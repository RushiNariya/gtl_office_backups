import { nanoid } from 'nanoid';
import data from './data';

const blogs = [...data];

const resolvers = {
  getBlog: ({ id }) => {
    const blogById = blogs.find((blog) => {
      return blog.id === id;
    });
    return blogById;
  },
  getBlogs: () => {
    return blogs;
  },
  createBlog: ({ input }) => {
    const { blogName, language, stack, creator, description } = input;
    let id = nanoid();
    let blog = {
      id,
      blogName,
      language,
      stack,
      description,
      creator,
    };
    blogs.push(blog);
    return blog;
  },
};

export default resolvers;
