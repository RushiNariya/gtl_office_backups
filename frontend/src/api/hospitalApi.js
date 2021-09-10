import axios from 'axios';

export const getHospital = async (token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/hospital/`, {
    headers,
  });
};

export const addHospital = async (adminDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/hospital/add`,
    adminDetails,
    {
      headers,
    },
  );
};

export const deleteHospital = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/hospital/${id}`,
    {
      headers,
    },
  );
};

export const getHospitalById = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/hospital/${id}`,
    {
      headers,
    },
  );
};

export const editHospitalById = async (hospitalDetails, id, token) => {
  console.log(id, token, hospitalDetails);
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/hospital/${id}`,
    hospitalDetails,
    {
      headers,
    },
  );
};
