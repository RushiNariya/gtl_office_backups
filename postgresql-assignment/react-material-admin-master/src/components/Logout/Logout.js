import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { userContext } from '../../context/user/userProvider';

function Logout() {
  const { userLogout } = useContext(userContext);
  const history = useHistory();

  useEffect(() => {
    userLogout();
    history.replace('/user/login');
  }, [history, userLogout]);

  return <></>;
}

export default Logout;
