/* eslint-disable no-console */
// import { getHospitalAdmin } from '../../api/hospitalAdminApi';
import {
  addHospital,
  deleteHospital,
  editHospitalById,
  getHospital,
  getHospitalById,
} from '../../api/hospitalApi';
import {
  ADD_HOSPITAL,
  DELETE_HOSPITAL,
  EDIT_HOSPITAL,
  GET_HOSPITAL,
  GET_HOSPITAL_BY_ID,
} from './types/hospital';
import { SET_ERROR } from './types/user';

export const getHospitalAction = (token) => (dispatch) => {
  getHospital(token)
    .then(async (res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        dispatch({
          type: GET_HOSPITAL,
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

export const addHospitalAction = (adminDetails, token) => (dispatch) => {
  addHospital(adminDetails, token)
    .then(async (res) => {
      if (!res.data.error) {
        dispatch({
          type: ADD_HOSPITAL,
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

export const deleteHospitalAction = (hospitalId, token) => (dispatch) => {
  deleteHospital(hospitalId, token)
    .then(async (res) => {
      console.log(res);
      if (res.status === 204) {
        dispatch({
          type: DELETE_HOSPITAL,
          payload: hospitalId,
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

export const getHospitalByIdAction = (hospitalId, token) => (dispatch) => {
  getHospitalById(hospitalId, token)
    .then(async (res) => {
      console.log(res);
      if (!res.data.error) {
        dispatch({
          type: GET_HOSPITAL_BY_ID,
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

export const editHospitalByIdAction = (hospitalDetails, hospitalId, token) => (dispatch) => {
  console.log(hospitalId);
  editHospitalById(hospitalDetails, hospitalId, token)
    .then(async (res) => {
      console.log(res);
      if (!res.data.error) {
        dispatch({
          type: EDIT_HOSPITAL,
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
