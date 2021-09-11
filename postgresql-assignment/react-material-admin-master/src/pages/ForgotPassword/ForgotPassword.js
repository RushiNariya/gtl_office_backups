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
// import { loginUser } from "../../../API/userAPI";

function ForgotPassword(props) {
  var classes = useStyles();

  // global
  var { userLogin } = useContext(userContext);

  // local
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    // e.preventDefault();

    // if (!email || !password) {
    //   alert("login credentials are required!");
    //   return;
    // }

    // const res = await loginUser({
    //   email,
    //   password,
    // });
    // console.log(res);

    // if (res.status === 201 && res.error === null) {
    //   const loggedInUser = {
    //     id: res.data.id,
    //     token: res.data.token,
    //     role: res.data.role,
    //   };
    //   userLogin(loggedInUser);
    //   props.history.replace("/app/dashboard");
    // } else {
    //   alert(res.error);
    // }

    // setEmail("");
    // setPassword("");

    // userLogin({
    //   id: 2,
    //   token: "fdsvfdsfdsfdsfvdsvgdf",
    //   role: "admin",
    // });
    // props.history.replace("/app/dashboard");
  };

  // const forgotPasswordHandler = () => {

  // }
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
            <Typography size="h1">Forgot Password</Typography>
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
              <div className={classes.formButtons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Send Mail
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default withRouter(ForgotPassword);
