import React, { useContext } from 'react';
import { GlobalContext } from '../context/globalProvider';
import Error from '../components/Error/Error';

const Authorization = (allowedRoles) => (WrappedComponent) => function WithAuthorization() {
  const { role } = useContext(GlobalContext);

  if (allowedRoles.includes(role)) {
    return <WrappedComponent />;
  }
  return (
    <Error
      error="Forbidden"
      message="You have no permission to access this page!"
    />
  );
};

export default Authorization;
