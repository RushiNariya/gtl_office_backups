import React, { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllHospitalsAction,
  getHospitalByIdAction,
  getAllHospitalAdminsAction,
  getHospitalAdminByIdAction,
  getGeneralnotesAction,
  patientRegistrationAction,
} from "./actions";
import { reducer } from "./reducer";

const initialState = {
  hospitals: [],
  hospital: null,
  hospitalAdmins: [],
  hospitalAdmin: null,
  generalNotes: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllHospitals = (payload) => {
    dispatch(getAllHospitalsAction(payload));
  };
  const getHospitalById = (payload) => {
    dispatch(getHospitalByIdAction(payload));
  };
  const getAllHospitalAdmins = (payload) => {
    dispatch(getAllHospitalAdminsAction(payload));
  };
  const getHospitalAdminById = (payload) => {
    dispatch(getHospitalAdminByIdAction(payload));
  };
  const getGeneralnotes = (payload) => {
    dispatch(getGeneralnotesAction(payload));
  };
  const patientRegistration = (payload) => {
    dispatch(patientRegistrationAction(payload));
  };

  return (
    <GlobalContext.Provider
      value={{
        hospitals: state.hospitals,
        hospital: state.hospital,
        hospitalAdmins: state.hospitalAdmins,
        hospitalAdmin: state.hospitalAdmins,
        generalNotes: state.generalNotes,
        getAllHospitals,
        getHospitalById,
        getAllHospitalAdmins,
        getHospitalAdminById,
        getGeneralnotes,
        patientRegistration,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
