import React from 'react';
import { useSelector } from 'react-redux';
import Error from '../components/Error/Error';

// eslint-disable-next-line max-len
const Authorization = () => (WrappedComponent) => function WithAuthorization() {
  const token = useSelector((state) => state.user.token);

  if (token) {
    return <WrappedComponent />;
    // eslint-disable-next-line no-else-return
  }

  return (
    <Error error="403 Forbidden" message="Please login to see this page!" />
  );
};

export default Authorization;
