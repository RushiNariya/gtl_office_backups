import axios from 'axios';
import variables from '../variables';

export const loginUser = async (credentials) => {
  const res = await axios.post(`${variables.BASE_URL}/user/login`, credentials);
  return res.data;
};

export const registerUser = async (UserDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };

  const res = await axios.post(`${variables.BASE_URL}/user/add`, UserDetails, {
    headers,
  });
  return res;
};
