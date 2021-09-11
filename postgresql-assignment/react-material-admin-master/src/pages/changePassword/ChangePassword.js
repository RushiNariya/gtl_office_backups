import React, { useState, useContext } from "react";

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

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import { userContext } from "../../context/user/userProvider";
import { loginUser } from "../../API/userAPI";

function Login(props) {
  var classes = useStyles();

  // global
  var { userLogin } = useContext(userContext);

  // local
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!confirmPassword || !password) {
      alert("login credentials are required!");
      return;
    }

    const res = await loginUser({
      password,
    });

    if (res.status === 201 && res.error === null) {
      const loggedInUser = {
        id: res.data.id,
        token: res.data.token,
        role: res.data.role,
      };
      userLogin(loggedInUser);
      props.history.replace("/app/dashboard");
    } else {
      alert('Invalid email or password!!')
      props.history.replace("/user/login");
    }

    setPassword("");
  };

  // const forgotPasswordHandler = () => {

  // }
  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          {/* <img src={logo} alt="logo" className={classes.logotypeImage} /> */}
          <Typography className={classes.logotypeText}>
            Hospital Management
          </Typography>
        </div>
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Typography size="h1">Change Password</Typography>
            <form onSubmit={loginHandler}>
            <TextField
                required
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <TextField
                required
                id="confirmPassword"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                placeholder="Confirm Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Login);
