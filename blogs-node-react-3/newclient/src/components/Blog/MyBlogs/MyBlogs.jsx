/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import {
  getBlogsByCreatorQuery,
  toggleLikeMutation,
  deleteBlogMutation,
} from '../../../queries/queries';
import { GlobalContext } from '../../../context/globalProvider';
import Pagination from '../../Pagination/Pagination';
import BLogFilter from '../BLogFilter/BLogFilter';
import Blog from '../Blog';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px',
  },
}));
function MyBlogs() {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [search, setSearch] = useState('All');

  const { articles, getBlogs } = useContext(GlobalContext);

  const { loading, data, refetch } = useQuery(getBlogsByCreatorQuery, {
    variables: { page: currentPage, limits: postsPerPage, search },
  });
  const [toggleLike] = useMutation(toggleLikeMutation);
  const [deleteBlog] = useMutation(deleteBlogMutation);

  const toggleLikeFunction = (blogId) => {
    toggleLike({
      variables: {
        blogId,
      },
      refetchQueries: [{ query: getBlogsByCreatorQuery }],
    })
      .then((res) => {
        console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error.message);
      });
  };

  const deleteBlogById = (id) => {
    console.log('inside delete handler!');
    deleteBlog({
      variables: {
        id,
      },
    })
      .then(async (res) => {
        if (res.data.deleteBlog.status === 'deleted') {
          toast.success('BLog deleted successfully.');
          await refetch();
        } else {
          throw new Error(res.data.deleteBlog.error);
        }
        console.log(res);
        // console.log(res.data.toggleLike.error);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.log(error.message);
      });
  };

  const setFilterSearch = (keyword) => {
    setSearch(keyword);
    setCurrentPage(1);
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
      if (data?.getBlogsByCreator?.data?.blogs?.length === 0 && currentPage !== 1) {
        setCurrentPage((preValue) => preValue - 1);
      }
      getBlogs(data?.getBlogsByCreator?.data?.blogs);
    }
    if (loading === false && data?.getBlogsByCreator?.error) {
      toast.error(data?.getBlogsByCreator.error);
      // console.log(data?.getBlogsByCreator.error);
    }
  }, [loading, data]);

  const paginate = (pageNum) => setCurrentPage(pageNum);

  const nextPage = () => setCurrentPage((recurrentPage) => recurrentPage + 1);

  const prevPage = () => setCurrentPage((recurrentPage) => recurrentPage - 1);
  return (
    <>
      <div className="bloglist__container">
        <div>
          <div className={classes.root}>
            {loading ? (
              <>
                <Blog
                  // key={blog._id}
                  loading="loading"
                  blog={null}
                  myBlog="myblogs"
                  toggleLikeOnClick={null}
                />
              </>
            ) : articles?.length ? (
              articles?.map((blog) => (
                <Blog
                  key={blog._id}
                  myBlog="myblogs"
                  blog={blog}
                  toggleLikeOnClick={toggleLikeFunction}
                  deleteBlogHandler={deleteBlogById}
                />
              ))
            ) : (
              <Blog
                blog={null}
                myBlog="myblogs"
                toggleLikeOnClick={null}
              />
            )}
          </div>
          <div className="blog__pagination">
            {loading ? null : articles?.length ? (
              <Pagination
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPosts={data?.getBlogsByCreator?.data?.totalBlog}
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

export default MyBlogs;
