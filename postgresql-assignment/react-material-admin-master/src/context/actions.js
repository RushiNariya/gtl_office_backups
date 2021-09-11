export const ADD_HOSPITAL = 'ADD_HOSPITAL';
export const GET_ALL_HOSPITALS = 'GET_ALL_HOSPITALS';
export const GET_HOSPITAL_BY_ID = 'GET_HOSPITAL_BY_ID';

export const ADD_HOSPITALADMIN = 'ADD_HOSPITALADMIN';
export const GET_ALL_HOSPITALADMINS = 'GET_ALL_HOSPITALADMINS';
export const GET_HOSPITALADMIN_BY_ID = 'GET_HOSPITALADMIN_BY_ID';

export const ADD_GENERAL_NOTE = 'ADD_GENERAL_NOTE';
export const GET_GENERAL_NOTES = 'GET_GENERAL_NOTES';
export const DELETE_GENERAL_NOTE = 'DELETE_GENERAL_NOTE';

// export const USER_LOGIN = 'USER_LOGIN';
// export const USER_LOGOUT = 'USER_LOGOUT';
export const PATIENT_REGISTRATION = 'PATIENT_REGISTRATION';

// export const REFRESH_STATE = 'REFRESH_STATE';
// export const SET_ERROR = 'SET_ERROR';
// export const RESET_ERROR = 'RESET_ERROR';

export const addHospitalAction = (payload) => ({
  type: ADD_HOSPITAL,
  payload,
});
export const getAllHospitalsAction = (payload) => ({
  type: GET_ALL_HOSPITALS,
  payload,
});
export const getHospitalByIdAction = (payload) => ({
  type: GET_HOSPITAL_BY_ID,
  payload,
});
export const addHospitalAdminAction = (payload) => ({
  type: ADD_HOSPITALADMIN,
  payload,
});
export const getAllHospitalAdminsAction = (payload) => ({
  type: GET_ALL_HOSPITALADMINS,
  payload,
});
export const getHospitalAdminByIdAction = (payload) => ({
  type: GET_HOSPITALADMIN_BY_ID,
  payload,
});
export const addGeneralnoteAction = (payload) => ({
  type: ADD_GENERAL_NOTE,
  payload,
});
export const getGeneralnotesAction = (payload) => ({
  type: GET_GENERAL_NOTES,
  payload,
});
export const deleteGeneralnoteAction = (payload) => ({
  type: DELETE_GENERAL_NOTE,
  payload,
});
export const patientRegistrationAction = (payload) => ({
  type: PATIENT_REGISTRATION,
  payload,
});
// export const userLoginAction = (payload) => ({
//   type: USER_LOGIN,
//   payload,
// });
// export const userLogoutAction = (payload) => ({
//   type: USER_LOGOUT,
//   payload,
// });
//-----------------

// export const refreshStateAction = (payload) => ({
//   type: REFRESH_STATE,
//   payload,
// });

// export const setErrorAction = (error) => ({
//   type: SET_ERROR,
//   payload: error,
// });

// export const resetErrorAction = () => ({
//   type: SET_ERROR,
// });
