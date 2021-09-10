const express = require('express');
const addBlog = require('../controllers/blogs/AddBlog');
const deleteBlog = require('../controllers/blogs/deleteBlog');
const editBlog = require('../controllers/blogs/editBlog');
const getBlogs = require('../controllers/blogs/getAllBlogs');
const getAllCategory = require('../controllers/blogs/getAllCategory');
const getBlogById = require('../controllers/blogs/getBlogById');
const { ensureToken } = require('../utils/jwtUtils');
const upload = require('../utils/image-upload');

const router = express.Router();

router.get(
  '/category',
  ensureToken(['editor', 'administrator']),
  getAllCategory
);
router.get('/', ensureToken(['viewer', 'editor', 'administrator']), getBlogs);
router.post(
  '/add',
  ensureToken(['editor', 'administrator']),
  upload.single('image'),
  addBlog
);
router.delete('/:id', ensureToken(['editor', 'administrator']), deleteBlog);
router.put(
  '/:id',
  ensureToken(['editor', 'administrator']),
  upload.single('image'),
  editBlog
);
router.get(
  '/:id',
  ensureToken(['viewer', 'editor', 'administrator']),
  getBlogById
);

module.exports = router;
