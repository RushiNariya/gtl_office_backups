import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import useStyles from './styles';
import { changePasswordAction, resetErrorAction } from '../../../store/actions/user';

function ChangePassword({
  history, changePassword, token, success, resetError,
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setIsLoading(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Password and Confirm Password must be same!!');
    }
    await changePassword({
      oldPassword,
      newPassword,
    }, token);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  return (
    <div className={classes.form}>
      <TextField
        id="oldPassword"
        margin="normal"
        placeholder="Old Password"
        type="password"
        fullWidth
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <TextField
        id="newPassword"
        margin="normal"
        placeholder="New Password"
        type="password"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextField
        id="confirmpassword"
        margin="normal"
        placeholder="Confirm Password"
        type="password"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <div className={classes.formButtons}>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            disabled={
              oldPassword.length === 0
              || newPassword.length === 0
              || confirmPassword.length === 0
            }
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            size="large"
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    success: state.user.success,
    token: state.user.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // eslint-disable-next-line max-len
    changePassword: (passwordDetails, token) => dispatch(changePasswordAction(passwordDetails, token)),
    resetError: () => dispatch(resetErrorAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChangePassword));
