/* eslint-disable no-console */
import {
  addDoctor, deleteDoctor, editDoctorById, getDoctor, getDoctorById,
} from '../../api/DoctorApi';
import {
  ADD_DOCTOR,
  DELETE_DOCTOR,
  EDIT_DOCTOR,
  GET_DOCTOR,
  GET_DOCTOR_BY_ID,
} from './types/doctor';
import { SET_ERROR } from './types/user';

export const getDoctorAction = (token) => (dispatch) => {
  getDoctor(token)
    .then(async (res) => {
      console.log(res);
      if (res.data.status === 200) {
        console.log(res.data);
        dispatch({
          type: GET_DOCTOR,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const addDoctorAction = (doctorDetails, token) => (dispatch) => {
  addDoctor(doctorDetails, token)
    .then(async (res) => {
      if (!res.data.error) {
        dispatch({
          type: ADD_DOCTOR,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const deleteDoctorAction = (doctorId, token) => (dispatch) => {
  deleteDoctor(doctorId, token)
    .then(async (res) => {
      console.log(res);
      if (res.status === 204) {
        dispatch({
          type: DELETE_DOCTOR,
          payload: doctorId,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const getDoctorByIdAction = (doctorId, token) => (dispatch) => {
  console.log(doctorId);
  getDoctorById(doctorId, token)
    .then(async (res) => {
      console.log(res);
      if (!res.data.error) {
        dispatch({
          type: GET_DOCTOR_BY_ID,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};

export const editDoctorByIdAction = (doctorDetails, doctorId, token) => (dispatch) => {
  console.log(doctorId);
  editDoctorById(doctorDetails, doctorId, token)
    .then(async (res) => {
      console.log(res);
      if (!res.data.error) {
        dispatch({
          type: EDIT_DOCTOR,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: SET_ERROR,
          payload: res.data.error,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payload: 'Internal Server Error',
      });
    });
};
