/* eslint no-underscore-dangle: 0 */

import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/globalProvider';
import './AddBlog.css';
import { addBlog } from '../../API/BlogApi';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%',
    minWidth: '200px',
    marginTop: theme.spacing(3),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2e5c4d',
    color: 'white',
  },
  color: {
    color: '#85a399',
    borderColor: '#85a399',
  },
}));

function AddBlog() {
  const { token, role } = useContext(GlobalContext);
  const history = useHistory();

  const classes = useStyles();

  const [blogTitle, setBlogTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    if (!blogTitle || !category || !description || !tags) {
      alert('All the fields are required!');
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('blogTitle', blogTitle);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('tags', tags);

    const res = await addBlog(formData, token);
    if (res.status === 201) {
      toast.success('Blog added successfully.');
      history.replace('/blogs');
    }
    if (res.error !== null) {
      toast.error(res.error);
    }

    setBlogTitle('');
    setCategory('');
    setDescription('');
    setTags('');
    setImage(null);
  };

  const unathorizedAccess = () => {
    history.push('/blogs');
  };

  const showImage = (e) => {
    setImage(e.target.files[0]);

    if (e.target.files && e.target.files.length !== 0) {
      const file = e.target.files[0];
      const previewImg = document.getElementById('blog_picture');
      previewImg.src = URL.createObjectURL(file);
      previewImg.classList.add('active');
    }
  };

  return (
    <>
      {role === 'administrator' || role === 'editor' ? (
        <div className="new-blog-container">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitForm}>
              <Typography component="h1" variant="h5">
                Add New Blog
              </Typography>
              <TextField
                className={classes.color}
                margin="normal"
                required
                fullWidth
                label="Title"
                name="blogTitle"
                autoFocus
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              <TextField
                select
                label="Category"
                className="blog_domain"
                margin="normal"
                autoFocus
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option>Select your blog category</option>
                <option value="1">Study</option>
                <option value="2">Research</option>
                <option value="3">Adventure</option>
                <option value="4">Sports</option>
              </TextField>

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                autoFocus
                margin="normal"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                // id="outlined-multiline-static"
                label="Tags"
                multiline
                fullWidth
                autoFocus
                margin="normal"
                rows={2}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <img
                id="blog_picture"
                className="blog_picture_show"
                alt="blog"
                width="100"
                height="100"
                src=""
              />
              <Button variant="contained" component="label">
                Upload File
                <input
                  onChange={showImage}
                  id="blog_picture_input"
                  type="file"
                  name="image"
                  hidden
                />
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Post
              </Button>
            </form>
          </div>
        </div>
      ) : (
        unathorizedAccess()
      )}
    </>
  );
}

export default AddBlog;
