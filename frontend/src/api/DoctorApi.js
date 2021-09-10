import axios from 'axios';

export const getDoctor = async (token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/`, {
    headers,
  });
};

export const addDoctor = async (doctorDetails, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/doctor/add`,
    doctorDetails,
    {
      headers,
    },
  );
};

export const deleteDoctor = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`,
    {
      headers,
    },
  );
};

export const getDoctorById = async (id, token) => {
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`,
    {
      headers,
    },
  );
};

export const editDoctorById = async (doctorDetails, id, token) => {
  console.log(id, token, doctorDetails);
  const headers = { Authorization: `Bearer ${token.replace(/"/g, '')}` };
  return axios.put(
    `${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`,
    doctorDetails,
    {
      headers,
    },
  );
};
