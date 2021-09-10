import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import logo from './logo.svg';
import { applyForgotPasswordAction, resetErrorAction } from '../../store/actions/user';

function ApplyForgotPassword({
  history, applyForgotPassword, resetError, success,
}) {
  const classes = useStyles();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    resetError();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success);
      history.push('/');
    }
  }, [success]);

  const handleSubmit = async (e) => {
    resetError();
    e.preventDefault();
    await applyForgotPassword({
      email: userName,
    });
    setUserName('');
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
            placeholder="Enter your registered Email Id"
            type="email"
            fullWidth
          />
          <div className={classes.formButtons}>
            <Button
              disabled={userName.length === 0}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Send Mail
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {
    success: state.user.success,
    error: state.user.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    applyForgotPassword: (email) => dispatch(applyForgotPasswordAction(email)),
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplyForgotPassword));
