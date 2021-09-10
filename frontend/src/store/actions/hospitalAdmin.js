import { addHospitalAdmin, getHospitalAdmin } from '../../api/hospitalAdminApi';
import { ADD_HOSPITAL_ADMIN, GET_HOSPITAL_ADMIN } from './types/hospitalAdmin';
import { SET_ERROR, SET_SUCCESS } from './types/user';

export const getHospitalAdminAction = (token) => (dispatch) => {
  getHospitalAdmin(token)
    .then(async (res) => {
      if (res.data.status === 200) {
        console.log(res.data);
        dispatch({
          type: GET_HOSPITAL_ADMIN,
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

export const addHospitalAdminAction = (adminDetails, token) => (dispatch) => {
  addHospitalAdmin(adminDetails, token)
    .then(async (res) => {
      if (!res.data.error) {
        console.log(res.data);
        dispatch({
          type: SET_SUCCESS,
          payload: 'Successfully Added',
        });
        dispatch({
          type: ADD_HOSPITAL_ADMIN,
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

export const editHospitalAdminAction = (adminDetails, token) => (dispatch) => {
  addHospitalAdmin(adminDetails, token)
    .then(async (res) => {
      if (!res.data.error) {
        console.log(res.data);
        dispatch({
          type: ADD_HOSPITAL_ADMIN,
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
