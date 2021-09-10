import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';

function Logout() {
  const { userLogout } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    userLogout();
    history.replace('/');
  }, [history, userLogout]);

  return <></>;
}

export default Logout;
