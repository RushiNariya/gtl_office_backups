import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import { GlobalContext } from '../../context/globalProvider';
import './BlogDetails.css';
import { getOneBlogById } from '../../API/BlogApi';

function BlogDetails({ match }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { blog, getBlogById, token } = useContext(GlobalContext);

  const { id } = match.params;

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
    setData(blog);
  }, [blog, data]);

  return (
    <>
      {!loading ? (
        <div className="blog-details-container">
          <div className="blog-details-title">
            <h1>{data && data.blog_title}</h1>
            <hr />
          </div>
          <div>
            <center>
              <img
                src={`https://rushi-blog-images.s3.ap-south-1.amazonaws.com/${data?.blog_image}`}
                alt="blog"
                className="responsive"
              />
              <br />
              <h6>{blog.blog_tags.split(' ').map((tag) => `#${tag} `)}</h6>
            </center>
          </div>
          <hr />
          <article className="blog-details-domain">
            <h3>
              Subject :
              {data && data.category_name}
            </h3>
            <br />
            {data?.blog_description}
            <br />
            <br />
            <h4>
              Written By:
              {`${data?.first_name} ${data?.last_name}`}
            </h4>
          </article>
          <hr />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

BlogDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BlogDetails;
