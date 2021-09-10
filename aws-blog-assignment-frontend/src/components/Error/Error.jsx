import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';

function Error({ error, message }) {
  const { token } = useContext(GlobalContext);

  return (
    <>
      <h1>{error}</h1>
      <hr />
      <p>{message}</p>
      <br />
      {token ? (
        <NavLink to="/blogs" exact>
          Go back to home page
        </NavLink>
      ) : (
        <NavLink to="/" exact>
          Go back to Login page
        </NavLink>
      )}
    </>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Error;
