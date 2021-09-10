import {
  ADD_DOCTOR,
  DELETE_DOCTOR,
  GET_DOCTOR,
  GET_DOCTOR_BY_ID,
} from '../actions/types/doctor';

const initialState = {
  doctors: [],
  doctor: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DOCTOR:
      console.log(action.payload);
      return {
        ...state,
        doctors: action.payload,
      };
    case GET_DOCTOR_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        doctor: action.payload,
      };
    case ADD_DOCTOR:
      console.log(action.payload);
      return {
        ...state,
        success: 'Successfully Added',
        doctors: [...state.doctors, action.payload],
      };
    case DELETE_DOCTOR:
      console.log(action.payload);
      return {
        ...state,
        success: 'Successfully deleted',
        doctors: state.doctors.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}
