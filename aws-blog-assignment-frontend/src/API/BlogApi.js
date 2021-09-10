import axios from 'axios';
import variables from '../variables';

export const getAllBlogs = async (token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.get(`${variables.BASE_URL}/blog`, {
    headers,
  });
  return res.data;
};

export const addBlog = async (blogDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.post(`${variables.BASE_URL}/blog/add`, blogDetails, {
    headers,
  });
  return res.data;
};

export const getOneBlogById = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.get(`${variables.BASE_URL}/blog/${id}`, {
    headers,
  });
  return res;
};

export const deleteBlog = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.delete(`${variables.BASE_URL}/blog/${id}`, {
    headers,
  });
  return res;
};

export const updateBlog = async (id, blogDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.put(`${variables.BASE_URL}/blog/${id}`, blogDetails, {
    headers,
  });
  return res;
};

export const searchBlog = async (keyword) => {
  try {
    const res = await axios.get(`${variables.BASE_URL}/blog/search?q=${keyword}`);
    if (res && res.data !== undefined) {
      const blogIdArray = res.data.hits.hit.map((blog) => parseInt(blog.fields.id, 10));
      return blogIdArray;
    }
    throw new Error('something is wrong');
  } catch (error) {
    return error.message;
  }
};
