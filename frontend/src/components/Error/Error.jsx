import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function Error({ token, error, message }) {
  return (
    <>
      <h1>{error}</h1>
      <hr />
      <p>{message}</p>
      <br />
      {token ? (
        <NavLink to="/app" exact>
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

function mapStateToProps(state) {
  return {
    token: state.user.token,
  };
}

export default connect(mapStateToProps, null)(withRouter(Error));
