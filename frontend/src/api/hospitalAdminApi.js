import axios from 'axios';

export const getHospitalAdmin = async (token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/hadmin/`, {
    headers,
  });
};

export const addHospitalAdmin = async (adminDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/hadmin/add`,
    adminDetails,
    {
      headers,
    },
  );
};
