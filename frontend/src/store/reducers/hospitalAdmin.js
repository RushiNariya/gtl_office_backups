import {
  ADD_HOSPITAL_ADMIN,
  GET_HOSPITAL_ADMIN,
} from '../actions/types/hospitalAdmin';

const initialState = {
  hospitalAdmin: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOSPITAL_ADMIN:
      console.log(action.payload);
      return {
        ...state,
        hospitalAdmin: action.payload,
      };
    case ADD_HOSPITAL_ADMIN:
      console.log(action.payload);
      return {
        ...state,
        hospitalAdmin: [...state.hospitalAdmin, action.payload],
      };
    default:
      return state;
  }
}
