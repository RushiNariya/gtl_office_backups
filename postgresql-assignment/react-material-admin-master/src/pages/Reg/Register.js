import React, { useState, useContext } from "react";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import Select from "@material-ui/core/Select";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { userContext } from "../../context/user/userProvider";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { registerUser } from "../../API/userAPI";

function Register(props) {
  var classes = useStyles();

  // global
  var { userLogin } = useContext(userContext);

  // local
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const [house, setHouse] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [disease, setDisease] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [scname, setScname] = useState("");
  const [scemail, setScemail] = useState("");
  const [pincode, setPincode] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confimPassword) {
      alert("password and confirm password must be same!!");
    }

    const res = await registerUser({
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

    if (res.status === 201 && res.error === null) {
      props.history.replace("/user/login");
    } else {
      alert(res.error);
      props.history.replace("/user/register");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setBirthdate("");
    setCity("");
    setHouse("");
    setState("");
    setStreet("");
    setDisease("");
    setWeight("");
    setHeight("");
    setScname("");
    setScemail("");
    setPincode("");
  };

  return (
    <React.Fragment>
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
                    // value={passwordValue}
                    // onChange={(e) => setPasswordValue(e.target.value)}
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
                    defaultValue="2017-05-24"
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
                  {/* </FormControl> */}
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
              <Button
                color="primary"
                size="large"
                // onClick = {forgotPasswordHandler}
                className={classes.forgetButton}
              >
                <NavLink to="/user/login" exact>
                  Sign In
                </NavLink>
              </Button>
            </form>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Register);
