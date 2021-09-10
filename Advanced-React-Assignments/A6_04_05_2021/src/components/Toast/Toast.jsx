import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContext } from '../../context/GlobalState';

function Toast() {
  const { error } = useContext(GlobalContext);

  const id = 'toast-id-yes';

  if (error !== '') {
    toast.error(error, { toastId: id });
    return (
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop="true"
        closeOnClick="true"
        rtl={false}
        pauseOnFocusLoss={false}
      />
    );
  }

  return <></>;
}

export default Toast;
