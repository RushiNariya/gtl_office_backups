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
import { withRouter } from "react-router-dom";
import Select from "@material-ui/core/Select";
// import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import Login from '../Log/Login';
import Register from '../Reg/Register';
// context
import { userContext } from "../../context/user/userProvider";


function LoginDashboard(props) {
  var classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          Hospital Management
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          { props.location.pathname === "/user/login" && <Login />}
          { props.location.pathname === "/user/register" && <Register />}
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(LoginDashboard);
