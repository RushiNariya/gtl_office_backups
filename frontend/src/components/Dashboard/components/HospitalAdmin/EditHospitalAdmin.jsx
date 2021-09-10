import React, { useState, useEffect } from 'react';
import {
  Modal, Grid, TextField, Button, InputLabel, Select,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { resetErrorAction } from '../../../../store/actions/user';
import { addHospitalAdminAction } from '../../../../store/actions/hospitalAdmin';

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

function EditHospitalAdmin({
  open, onClose, success, error, addHospitalAdmin, resetError, token,
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

  const addHandler = async (e) => {
    e.preventDefault();
    resetError();

    if (password !== confimPassword) {
      toast.error('Password and Confirm Password must be same!!');
    }

    addHospitalAdmin({
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
    }, token);

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setBirthdate('');
    setCity('');
    setHouse('');
    setState('');
    setStreet('');
    setPincode('');
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
          <h2 id="simple-modal-title">Add Hospital Admin</h2>
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
                  id="house"
                  name="house"
                  label="House Number"
                  fullWidth
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addHospitalAdmin: (adminDetail, token) => dispatch(addHospitalAdminAction(adminDetail, token)),
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditHospitalAdmin);
