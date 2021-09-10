import axios from 'axios';

export const loginUser = async (loginDetails) => axios
  .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginDetails);

export const registerUser = async (userDetails) => axios
  .post(`${process.env.REACT_APP_BACKEND_URL}/patient/add`, userDetails);

export const applyForgotPassword = async (email) => axios
  .post(`${process.env.REACT_APP_BACKEND_URL}/user/applyforgotpassword`, email);

export const changePassword = async (passwordDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/user/changepassword`,
    passwordDetails,
    { headers },
  );
};
// export const loginUser = async (loginDetails) => axios
//   .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginDetails)
//   .then((res) => res.data)
//   .catch((error) => error.response);

// export const registerUser = async (userDetails) => axios
//   .post(`${process.env.REACT_APP_BACKEND_URL}/patient/add`, userDetails)
//   .then((res) => res)
//   .catch((error) => error.response);

// export const forgotPassword = async (email) => axios
//   .post(`${process.env.REACT_APP_BACKEND_URL}/user/applyforgotpassword`, email)
//   .then((res) => res.data)
//   .catch((error) => error.response);
// export const changePassword = async (email, token) => {
//   const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
//   return axios
//     .put(
//       `${process.env.REACT_APP_BACKEND_URL}/user/changepassword`,
//       email, { headers },
//     )
//     .then((res) => res.data)
//     .catch((error) => error.response);
// };
