import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function Error({ error }) {
  return (
    <>
      <h1>{error}</h1>
      <br />
      <NavLink to="/" exact>
        Go back to home page
      </NavLink>
    </>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;
