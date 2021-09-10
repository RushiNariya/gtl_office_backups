/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';
import MUIDataTable from 'mui-datatables';
import AddHospitalAdmin from './AddHospitalAdmin';
import { getHospitalAdminAction } from '../../../../store/actions/hospitalAdmin';
import { resetErrorAction } from '../../../../store/actions/user';

function HospitalAdmin({
  getHospitalAdminAction: getHospitalAdmin,
  hospitalAdmin,
  token,
  resetErrorAction: resetError,
}) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { name: 'id' },
    { name: 'name' },
    {
      name: 'Actions',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const handleClick = (e) => {
            handleOpen();
            console.log(tableMeta);
          };
          return (
            <Button onClick={handleClick} variant="outlined" color="secondary">
              edit
            </Button>
          );
        },
      },
    },
    {
      name: '',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Button variant="outlined" color="secondary">
            delete
          </Button>
        ),
      },
    },
  ];

  console.log(loading);
  console.log(hospitalAdmin);
  useEffect(async () => {
    if (token) {
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
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add
          </Button>
          <AddHospitalAdmin open={open} onClose={handleClose} />
          <MUIDataTable
            title="Hospital Admin List"
            data={hospitalAdmin}
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
    hospitalAdmin: state.hospitalAdmin.hospitalAdmin,
    token: state.user.token,
  };
}

export default connect(mapStateToProps, {
  resetErrorAction,
  getHospitalAdminAction,
})(HospitalAdmin);
