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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("login credentials are required!");
      return;
    }

    const res = await loginUser({
      email,
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

    setEmail("");
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
            <Typography size="h1">Login</Typography>
            <form onSubmit={loginHandler}>
              <TextField
                id="email"
                required
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
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
              <div className={classes.formButtons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  size="large"
                  // onClick = {forgotPasswordHandler}
                  className={classes.forgetButton}
                >
                  <NavLink to="/user/applyforgotpassword" exact>
                    Forgot Password
                  </NavLink>
                </Button>
              </div>
              <NavLink to="/user/register" className={classes.registerUser} exact>
                New User? sign Up
              </NavLink>
            </form>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(Login);
