import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import logo from './logo.svg';
import { loginAction, resetErrorAction } from '../../store/actions/user';

function Login({
  token, login, history, error, resetError,
}) {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      history.push('/app');
    }
    if (error) {
      toast.error(error);
    }
  }, [token, error]);

  const handleSubmit = async (e) => {
    resetError();
    e.preventDefault();
    await login({
      email: userName,
      password,
    });
    setUserName('');
    setPassword('');
  };
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
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              placeholder="Email Address"
              type="email"
              fullWidth
            />
            <TextField
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

            <Button
              disabled={userName.length === 0 || password.length === 0}
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
              className={classes.forgetButton}
              onClick={() => history.push('/applyforgotpassword')}
            >
              Forgot Password
            </Button>
            <Button
              className={classes.forgetButton}
              color="primary"
              size="large"
            >
              <NavLink to="/register" className={classes.registerUser} exact>
                New User? sign Up
              </NavLink>
            </Button>
          </form>
        </div>
      </div>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    error: state.user.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (user) => dispatch(loginAction(user)),
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
