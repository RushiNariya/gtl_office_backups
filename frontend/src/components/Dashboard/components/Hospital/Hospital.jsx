/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import AddHospital from './AddHospital';
import {
  getHospitalAction,
  deleteHospitalAction,
  getHospitalByIdAction,
} from '../../../../store/actions/hospital';
import { resetErrorAction } from '../../../../store/actions/user';
// import { getHospitalAdmin } from '../../../../api/hospitalAdminApi';
import { getHospitalAdminAction } from '../../../../store/actions/hospitalAdmin';
import EditHospital from './EditHospital';

function Hospital({
  getHospitalAdminAction: getHospitalAdmin,
  hospitalAdmin,
  getHospitalAction: getHospital,
  deleteHospitalAction: deleteHospital,
  getHospitalByIdAction: getHospitalById,
  hospitals,
  token,
  resetErrorAction: resetError,
}) {
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
    { label: 'Name', name: 'name' },
    { label: 'Contact', name: 'contact_no' },
    {
      name: '',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const editHandler = async (e) => {
            await getHospitalById(tableMeta.rowData[0], token);
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
            deleteHospital(tableMeta.rowData[0], token);
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

  // console.log(loading);
  // console.log(hospitals);

  useEffect(async () => {
    if (token) {
      await getHospital(token);
      await getHospitalAdmin(token);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    resetError();
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addHandleOpen}>
            Add
          </Button>
          <AddHospital open={addOpen} onClose={addHandleClose} />
          <EditHospital open={editOpen} onClose={editHandleClose} />
          <MUIDataTable
            title="Hospital List"
            data={hospitals}
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
    hospitals: state.hospital.hospitals,
    token: state.user.token,
    hospitalAdmin: state.hospitalAdmin.hospitalAdmin,
  };
}

export default connect(mapStateToProps, {
  resetErrorAction,
  getHospitalAction,
  getHospitalAdminAction,
  deleteHospitalAction,
  getHospitalByIdAction,
})(Hospital);
