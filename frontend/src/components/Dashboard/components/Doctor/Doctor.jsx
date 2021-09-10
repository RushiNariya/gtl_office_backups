/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import AddDoctor from './AddDoctor';
// import {
//   getHospitalAction,
//   deleteHospitalAction,
//   getHospitalByIdAction,
// } from '../../../../store/actions/hospital';
import { resetErrorAction } from '../../../../store/actions/user';
// import { getHospitalAdmin } from '../../../../api/hospitalAdminApi';
import { getDoctorAction, deleteDoctorAction, getDoctorByIdAction } from '../../../../store/actions/doctor';
import EditDoctor from './EditDoctor';

function Doctor({
  // getHospitalAdminAction: getHospitalAdmin,
  // hospitalAdmin,
  getDoctorByIdAction: getDoctorById,
  getDoctorAction: getDoctor,
  deleteDoctorAction: deleteDoctor,
  // getHospitalByIdAction: getHospitalById,
  doctors,
  token,
  resetErrorAction: resetError,
}) {
  useEffect(() => {
    resetError();
  }, []);

  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const addHandleOpen = () => {
    setAddOpen(true);
  };

  const addHandleClose = () => {
    setAddOpen(false);
  };

  const editHandleOpen = () => {
    setEditOpen(true);
  };

  const editHandleClose = () => {
    setEditOpen(false);
  };

  const columns = [
    { label: 'Id', name: 'id' },
    { label: 'Name', name: 'doctor_name' },
    { label: 'Contact', name: 'phone' },
    {
      name: '',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const editHandler = async (e) => {
            await getDoctorById(tableMeta.rowData[0], token);
            editHandleOpen();
          };
          return (
            <Button variant="outlined" color="primary" onClick={editHandler}>
              Edit
            </Button>
          );
        },
      },
    },
    {
      name: '',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const deleteHandler = (e) => {
            console.log(tableMeta.rowData[0]);
            deleteDoctor(tableMeta.rowData[0], token);
          };
          return (
            <Button
              onClick={deleteHandler}
              variant="outlined"
              color="secondary"
            >
              delete
            </Button>
          );
        },
      },
    },
  ];

  useEffect(async () => {
    if (token) {
      await getDoctor(token);
      setLoading(false);
    }
  }, [token]);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addHandleOpen}>
            Add
          </Button>
          <AddDoctor open={addOpen} onClose={addHandleClose} />
          <EditDoctor open={editOpen} onClose={editHandleClose} />
          <MUIDataTable
            title="Doctor List"
            data={doctors}
            columns={columns}
            options={{
              selectableRows: 'none',
              onDownload: 'false',
              print: 'false',
              download: 'false',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    doctors: state.doctor.doctors,
    token: state.user.token,
    // hospitalAdmin: state.hospitalAdmin.hospitalAdmin,
  };
}

export default connect(mapStateToProps, {
  resetErrorAction,
  getDoctorAction,
  deleteDoctorAction,
  getDoctorByIdAction,
  // getHospitalAdminAction,
  // deleteHospitalAction,
  // getHospitalByIdAction,
})(Doctor);
