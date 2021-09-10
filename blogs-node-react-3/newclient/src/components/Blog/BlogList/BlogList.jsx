/* eslint-disable no-nested-ternary */
/* eslint no-underscore-dangle: 0 */

import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import { getBlogsQuery, toggleLikeMutation, certifyBlogMutation } from '../../../queries/queries';
import { GlobalContext } from '../../../context/globalProvider';
import Pagination from '../../Pagination/Pagination';
import BLogFilter from '../BLogFilter/BLogFilter';
import Blog from '../Blog';
// eslint-disable-next-line import/no-unresolved
import './BlogList.css';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));

function BlogList() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(2);
  // const [loading, setLoading] = uLeState(false);
  const [search, setSearch] = useState('All');

  const { articles, getBlogs } = useContext(GlobalContext);

  const { loading, data, refetch } = useQuery(getBlogsQuery, {
    variables: { page: currentPage, limits: postsPerPage, search },
  });
  const [toggleLike] = useMutation(toggleLikeMutation);
  const [certifyBlog] = useMutation(certifyBlogMutation);

  const toggleLikeFunction = (blogId) => {
    toggleLike({
      variables: {
        blogId,
      },
      refetchQueries: [{ query: getBlogsQuery }],
    })
      .then((res) => {
        console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error.message);
      });
  };

  const certifyBlogById = (id, blogStatus) => {
    console.log('inside certify handler!');
    certifyBlog({
      variables: {
        id,
        status: blogStatus,
      },
    })
      .then(async (res) => {
        console.log(res);
        await refetch();
        // console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error.message);
      });
  };

  const setFilterSearch = (keyword) => {
    setCurrentPage(1);
    setSearch(keyword);
  };
  const refetchQuery = async () => {
    await refetch();
  };
  useEffect(() => {
    refetchQuery();
  }, [search, currentPage]);

  useEffect(() => {
    if (loading === false && data !== undefined) {
      console.log(data);
      if (data?.getBlogs?.data?.blogs?.length === 0 && currentPage !== 1) {
        setCurrentPage((preValue) => preValue - 1);
      }
      getBlogs(data?.getBlogs?.data?.blogs);
    }
    if (loading === false && data?.getBlogs?.error) {
      toast.error(data.getBlogs.error);
      // console.log(data.getBlogs.error);
    }
  }, [loading, data]);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage((prePage) => prePage + 1);

  const prevPage = () => setCurrentPage((prePage) => prePage - 1);
  return (
    <>
      <div className="bloglist__container">
        <div>
          <div className={classes.root}>
            {loading ? (
              <>
                <Blog
                  loading="loading"
                  blog={null}
                  toggleLikeOnClick={null}
                  certifyBlogHandler={null}
                />
              </>
            ) : articles?.length ? (
              articles?.map((blog) => (
                <Blog
                  key={blog._id}
                  blog={blog}
                  toggleLikeOnClick={toggleLikeFunction}
                  certifyBlogHandler={certifyBlogById}
                />
              ))
            ) : (
              <Blog
                blog={null}
                toggleLikeOnClick={null}
                certifyBlogHandler={null}
              />
            )}
          </div>
          <div className="blog__pagination">
            {loading ? null : articles?.length ? (
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={data?.getBlogs?.data?.totalBlog}
                paginate={paginate}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            ) : null}
          </div>
        </div>
        <div className="multi__serach">
          <BLogFilter setFilter={setFilterSearch} search={search} />
        </div>
      </div>
    </>
  );
}

export default BlogList;
