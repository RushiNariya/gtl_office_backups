import {
  ADD_HOSPITAL,
  GET_ALL_HOSPITALS,
  GET_HOSPITAL_BY_ID,
  ADD_HOSPITALADMIN,
  GET_ALL_HOSPITALADMINS,
  GET_HOSPITALADMIN_BY_ID,
  ADD_GENERAL_NOTE,
  GET_GENERAL_NOTES,
  DELETE_GENERAL_NOTE,
  PATIENT_REGISTRATION,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_HOSPITAL:
      return {
        ...state,
        // hospitals: action.payload,
      };
    case GET_ALL_HOSPITALS:
      return {
        ...state,
        hospitals: action.payload,
      };
    case GET_HOSPITAL_BY_ID:
      return {
        ...state,
        hospital: action.payload,
      };
    case ADD_HOSPITALADMIN:
      return {
        ...state,
      };
    case GET_ALL_HOSPITALADMINS:
      return {
        ...state,
        hospitalAdmins: action.payload,
      };
    case GET_HOSPITALADMIN_BY_ID:
      return {
        ...state,
        hospitalAdmin: action.payload,
      };
    case ADD_GENERAL_NOTE:
      return {
        ...state,
      };
    case GET_GENERAL_NOTES:
      return {
        ...state,
        generalNotes: action.payload,
      };
    case DELETE_GENERAL_NOTE:
      return {
        ...state,
      };
    case PATIENT_REGISTRATION:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};
