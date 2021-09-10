import {
  ADD_HOSPITAL,
  DELETE_HOSPITAL,
  // EDIT_HOSPITAL,
  GET_HOSPITAL,
  GET_HOSPITAL_BY_ID,
} from '../actions/types/hospital';

const initialState = {
  hospitals: [],
  hospital: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_HOSPITAL:
      console.log(action.payload);
      return {
        ...state,
        hospitals: action.payload,
      };
    case GET_HOSPITAL_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        hospital: action.payload,
      };
    case ADD_HOSPITAL:
      console.log(action.payload);
      return {
        ...state,
        success: 'Successfully Added',
        hospitals: [...state.hospitals, action.payload],
      };
    case DELETE_HOSPITAL:
      console.log(action.payload);
      return {
        ...state,
        success: 'Successfully deleted',
        hospitals: state.hospitals.filter((item) => item.id !== action.payload),
      };
    // case EDIT_HOSPITAL:
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     success: 'Successfully updated',
    //     hospitals: [...state.hospitals, action.payload],
    //   };
    default:
      return state;
  }
}
