import React, { useContext } from 'react';
import { GlobalContext } from '../../context/globalProvider';

function Welcome() {
  const { role } = useContext(GlobalContext);

  if (role === 'Author') {
    return <div>Welcome to the Author Dashboard</div>;
  }

  return <div>Welcome to the Admin Dashboard</div>;
}

export default Welcome;
