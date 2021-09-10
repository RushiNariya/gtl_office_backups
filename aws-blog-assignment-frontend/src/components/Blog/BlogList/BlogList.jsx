/* eslint-disable no-nested-ternary */

import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import { GlobalContext } from '../../../context/globalProvider';
import Blog from '../Blog';
import './BlogList.css';
import { deleteBlog, getAllBlogs } from '../../../API/BlogApi';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));

function BlogList() {
  const {
    token, blogs, getBlogs, filteredBlogs,
  } = useContext(GlobalContext);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [blog, setBlog] = useState(null);

  const deleteBlogFunction = async (id) => {
    const res = await deleteBlog(id, token);
    if (res.status === 204) {
      setToggle(true);
    }
    if (res.status === 200) {
      toast.error(res.data.error);
    }
  };

  const getData = async () => {
    const res = await getAllBlogs(token);
    return res;
  };

  useEffect(() => {
    if (token) {
      getData()
        .then((res) => {
          getBlogs(res.data);
          setLoading(false);
          setToggle(false);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [token, toggle]);

  useEffect(() => {
    setBlog(blogs);
  }, [blogs]);

  return (
    <>
      <div>
        <div>
          {filteredBlogs ? (
            <div className={classes.root}>
              {filteredBlogs.map((oneBlog) => (
                <Blog
                  key={oneBlog.id}
                  blog={oneBlog}
                  deleteBlogHandler={deleteBlogFunction}
                />
              ))}
            </div>
          ) : (
            <div className={classes.root}>
              {loading ? (
                <>
                  <Blog
                    loading="loading"
                    blog={null}
                    deleteBlogHandler={null}
                  />
                </>
              ) : blog?.length ? (
                blog?.map((oneBlog) => (
                  <Blog
                    key={oneBlog.id}
                    blog={oneBlog}
                    deleteBlogHandler={deleteBlogFunction}
                  />
                ))
              ) : (
                <Blog blog={null} deleteBlogHandler={null} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogList;
