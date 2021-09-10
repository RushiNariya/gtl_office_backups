import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import toast from 'react-hot-toast';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../context/globalProvider';
import '../AddBlog/AddBlog.css';
import { getOneBlogById, updateBlog } from '../../API/BlogApi';

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

function EditBLog({ match }) {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const {
    blog, getBlogById, token, role,
  } = useContext(GlobalContext);

  const history = useHistory();

  const classes = useStyles();

  const [blogTitle, setBlogTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const getData = async () => {
    const res = await getOneBlogById(id, token);
    return res;
  };

  useEffect(() => {
    if (token) {
      getData()
        .then((res) => {
          getBlogById(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [token]);

  useEffect(() => {
    setBlogTitle(blog?.blog_title);
    setCategory(blog?.category_id);
    setDescription(blog?.blog_description);
    setTags(blog?.blog_tags);
  }, [blog]);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!blogTitle || !category || !description || !tags) {
      alert('All the fields are required!');
      return;
    }

    const formData = new FormData();
    if (image) {
      formData.append('image', image);
    }
    formData.append('blogTitle', blogTitle);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('tags', tags);

    const res = await updateBlog(id, formData, token);

    if (res.status === 204) {
      toast.success('Blog updated successfully.');
      history.replace('/blogs');
    }
    if (res.status === 200) {
      toast.error(res.data.error);
    }
  };

  const unathorizedAccess = () => {
    history.push('/blogs');
  };

  if (loading === true) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {role === 'administrator' || role === 'editor' ? (
        <div className="new-blog-container">
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitForm}>
              <Typography component="h1" variant="h5">
                Update Your Blog
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
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option>Select your blog category</option>
                <option value="1">Study</option>
                <option value="2">Research</option>
                <option value="3">Adventure</option>
              </TextField>

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                autoFocus
                margin="normal"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
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
                alt="blog"
                width="100"
                height="100"
                src={image ? URL.createObjectURL(image) : `https://rushi-blog-images.s3.ap-south-1.amazonaws.com/${blog.blog_image}`}
              />
              <Button variant="contained" component="label">
                Upload File
                <input type="file" name="image" hidden onChange={(e) => setImage(e.target.files[0])} />
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

EditBLog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(EditBLog);
