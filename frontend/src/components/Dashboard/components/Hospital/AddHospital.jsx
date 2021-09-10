/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { resetErrorAction } from '../../../../store/actions/user';
import { getHospitalAdminAction } from '../../../../store/actions/hospitalAdmin';
import { addHospitalAction } from '../../../../store/actions/hospital';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => createStyles({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '6px',
    border: '2px solid grey',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AddHospital({
  getHospitalAdmin,
  addHospital,
  hospitalAdmin,
  open,
  onClose,
  success,
  error,
  resetError,
  token,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [hoursOfOperation, setHoursOfOperation] = useState('');
  const [diseases, setDiseases] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    resetError();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success);
      onClose();
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  useEffect(async () => {
    if (token) {
      await getHospitalAdmin(token);
    }
  }, [token]);

  const addHandler = async (e) => {
    e.preventDefault();
    resetError();

    addHospital(
      {
        name,
        email,
        contactNo,
        hoursOfOperation,
        diseases,
        city,
        stateId: state,
        street,
        pincode,
        userId,
      },
      token,
    );

    setName('');
    setEmail('');
    setContactNo('');
    setCity('');
    setState('');
    setStreet('');
    setPincode('');
    setDiseases('');
    setHoursOfOperation('');
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add Hospital</h2>
          <form onSubmit={addHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="hospitalName"
                  name="hospitalName"
                  label="Hospital name"
                  fullWidth
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email address"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Phone No."
                  fullWidth
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="hoursOfOperation"
                  name="hoursOfOperation"
                  label="Hours Of Operation"
                  fullWidth
                  value={hoursOfOperation}
                  onChange={(e) => setHoursOfOperation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor="grouped-native-select">
                  Choose State
                </InputLabel>
                <Select
                  native
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="select state" />
                  <option value={1}>Gujarat</option>
                  <option value={2}>Rajasthan</option>
                  <option value={3}>Maharashtra</option>
                  <option value={4}>Karnataka</option>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Postal code"
                  fullWidth
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  required
                  id="street"
                  name="street"
                  label="Street Number"
                  fullWidth
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel htmlFor="grouped-native-select">
                  select hospital admin
                </InputLabel>
                <Select
                  native
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="select hadmin" />
                  {hospitalAdmin.map((hadmin) => (
                    <option value={hadmin.id}>{hadmin.name}</option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Diseases"
                  multiline
                  rows={3}
                  fullWidth
                  value={diseases}
                  onChange={(e) => setDiseases(e.target.value)}
                />
              </Grid>
            </Grid>
            <div className={classes.creatingButtonContainer}>
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.createAccountButton}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    token: state.user.token,
    error: state.user.error,
    success: state.user.success,
    hospitalAdmin: state.hospitalAdmin.hospitalAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addHospital: (hospitalDetails, token) => dispatch(addHospitalAction(hospitalDetails, token)),
    resetError: () => dispatch(resetErrorAction()),
    getHospitalAdmin: (token) => dispatch(getHospitalAdminAction(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddHospital);
