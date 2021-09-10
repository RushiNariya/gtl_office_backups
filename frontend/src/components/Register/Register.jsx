import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import logo from './logo.svg';
import { registerAction, resetErrorAction } from '../../store/actions/user';

function Register({
  resetError, history, register, error, success,
}) {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [city, setCity] = useState('');
  const [house, setHouse] = useState('');
  const [state, setState] = useState(null);
  const [street, setStreet] = useState('');
  const [disease, setDisease] = useState('');
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [scname, setScname] = useState('');
  const [scemail, setScemail] = useState('');
  const [pincode, setPincode] = useState(null);

  useEffect(() => {
    resetError();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success);
      history.replace('/');
    }
    if (error) {
      history.replace('/register');
    }
  }, [success, error]);

  const registerHandler = async (e) => {
    e.preventDefault();
    resetError();

    if (password !== confimPassword) {
      toast.error('Password and Confirm Password must be same!!');
      return;
    }

    register({
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
      diseases: disease,
      weight,
      height,
      secondaryContactName: scname,
      secondaryContactEmail: scemail,
      pincode,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword(null);
    setPhone('');
    setBirthdate(null);
    setCity('');
    setHouse('');
    setState(null);
    setStreet('');
    setDisease('');
    setWeight(null);
    setHeight(null);
    setScname('');
    setScemail('');
    setPincode(null);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          <img src={logo} alt="logo" className={classes.logotypeImage} />
          <Typography className={classes.logotypeText}>
            Hospital Management
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Typography size="h1">Register New User</Typography>
            <form onSubmit={registerHandler}>
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
                    id="date"
                    label="Birthday"
                    type="date"
                    // defaultValue="2017-05-24"
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="secondaryEmail"
                    name="secondaryEmail"
                    label="Secondary Email"
                    fullWidth
                    value={scemail}
                    onChange={(e) => setScemail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="secondaryname"
                    name="secondaryname"
                    label="secondaryName"
                    fullWidth
                    value={scname}
                    onChange={(e) => setScname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="weight"
                    name="weight"
                    label="Weigth"
                    fullWidth
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="height"
                    name="height"
                    label="Height"
                    fullWidth
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="Diseases"
                    name="Diseases"
                    label="Disease"
                    fullWidth
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
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
                  Create your account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </>
  );
}

function mapStateToProps(state) {
  return {
    error: state.user.error,
    success: state.user.success,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (userDetails) => dispatch(registerAction(userDetails)),
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Register));
