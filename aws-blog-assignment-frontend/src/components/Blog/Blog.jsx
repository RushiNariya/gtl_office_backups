/* eslint-disable react/require-default-props */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  Avatar,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
import './Blog.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '100px',
  },
  clarify: {
    height: 0,
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 12,
  },
  blogTitle: {
    margin: '0px',
  },
  avatar: {
    backgroundColor: '#85a399',
  },
  iconColor: {
    color: 'red',
  },
  media: {
    height: '200px',
    width: '200px',
    borderRadius: '10px',
    objectFit: 'contain',
    paddingTop: '56.25%',
  },
  deleteIcon: {
    color: '#2e5c4d',
  },
}));

function Blog({
  blog, loading, deleteBlogHandler,
}) {
  const { role } = useContext(GlobalContext);

  const classes = useStyles();
  if (loading) {
    return (
      <div className="blog__card_root_container no__blogs">Loading...</div>
    );
  }
  return (
    <>
      {blog ? (
        <Card className="blog__card_root_container">
          <CardHeader
            avatar={(
              <Avatar aria-label="recipe" className={classes.avatar}>
                {blog.first_name[0].toUpperCase()}
              </Avatar>
            )}
            title={`${blog.first_name} ${blog.last_name}`}
            subheader={`related to ${blog.category_name}`}
          />

          <div className="blog__body">
            <div className="blog__body_content">
              <CardContent>
                <Typography
                  variant="h5"
                  className={classes.blogTitle}
                  component="h2"
                >
                  {blog.blog_title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {blog.blog_tags.split(' ').map((tag) => `#${tag} `)}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  {blog.blog_description.substring(0, 200)}
                  ...
                </Typography>
              </CardContent>
            </div>
            <div className="blog__body_media">
              <CardMedia
                className={classes.media}
                image={`https://rushi-blog-images.s3.ap-south-1.amazonaws.com/${blog.blog_image}`}
                title="Blog"
              />
            </div>
          </div>
          <CardActions>
            <Button size="small">
              <NavLink to={`/blog/${blog.id}`} className="read-more" exact>
                Read More
              </NavLink>
            </Button>
            {role === 'administrator' ? (
              <>
                <IconButton
                  // aria-label="add to favorites"
                  onClick={() => deleteBlogHandler(blog.id)}
                >
                  <DeleteIcon className={classes.deleteIcon} />
                </IconButton>
                <IconButton>
                  <NavLink to={`/blog/${blog.id}/edit`} exact>
                    <EditIcon className={classes.deleteIcon} />
                  </NavLink>
                </IconButton>
              </>
            ) : null}
          </CardActions>
        </Card>
      ) : (
        <div className="blog__card_root_container no__blogs">no blogs</div>
      )}
    </>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    blog_title: PropTypes.string.isRequired,
    blog_image: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    blog_description: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    blog_tags: PropTypes.string.isRequired,
  }),
  loading: PropTypes.string,
  deleteBlogHandler: PropTypes.func,
};

export default Blog;
