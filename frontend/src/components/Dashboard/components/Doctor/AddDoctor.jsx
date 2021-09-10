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
import { addDoctorAction } from '../../../../store/actions/doctor';
import { getHospitalAction } from '../../../../store/actions/hospital';

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

function AddDoctor({
  getHospital,
  addDoctor,
  resetError,
  open,
  onClose,
  success,
  error,
  token,
  hospitals,
}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('');
  const [house, setHouse] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [pincode, setPincode] = useState('');
  const [hospital, setHospital] = useState('');
  const [education, setEducation] = useState('');
  const [specilities, setSpecilities] = useState('');

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
      await getHospital(token);
    }
  }, [token]);

  const addHandler = async (e) => {
    e.preventDefault();
    resetError();

    await addDoctor(
      {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        phone,
        birthdate,
        city,
        house,
        stateId: state,
        street,
        pincode,
        hospital,
        education,
        specilities,
      },
      token,
    );

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhone('');
    setBirthdate('');
    setCity('');
    setHouse('');
    setState('');
    setStreet('');
    setPincode('');
    setHospital('');
    setEducation('');
    setSpecilities('');
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
          <h2 id="simple-modal-title">Add Doctor</h2>
          <form onSubmit={addHandler}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  margin="normal"
                  placeholder="Email Adress"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="password"
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="confirmpassword"
                  margin="normal"
                  placeholder="confirm Password"
                  type="password"
                  fullWidth
                  value={confimPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
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

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="house"
                  name="house"
                  label="House Number"
                  fullWidth
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />
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

              <Grid item xs={12} sm={12}>
                <InputLabel htmlFor="grouped-native-select">
                  select hospital
                </InputLabel>
                <Select
                  native
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  id="grouped-native-select"
                  fullWidth
                >
                  <option aria-label="None" value="select hospital" />
                  {hospitals.map((hostipal) => (
                    <option value={hostipal.id}>{hostipal.name}</option>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="education"
                  name="education"
                  label="Education"
                  fullWidth
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="specilities"
                  name="specilities"
                  label="Specilities"
                  fullWidth
                  value={specilities}
                  onChange={(e) => setSpecilities(e.target.value)}
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
    hospitals: state.hospital.hospitals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addDoctor: (doctorDetails, token) => dispatch(addDoctorAction(doctorDetails, token)),
    resetError: () => dispatch(resetErrorAction()),
    getHospital: (token) => dispatch(getHospitalAction(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDoctor);
