import axios from 'axios';
// import process.env REACT_APP '../variables';

export const loginUser = async (credentials) => {
  const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, credentials);
  console.log(res);
  return res.data;
};

export const registerUser = async (UserDetails) => {
  const res = await axios.post(`${process.env.REACT_APP_URL}/patient/add`, UserDetails);
  return res.data;
};
