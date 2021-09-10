import React, { useState, useContext } from 'react';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import toast from 'react-hot-toast';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './Registration.css';
import { registerUser } from '../../API/UserApi';
import { GlobalContext } from '../../context/globalProvider';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%',
    minWidth: '250px',
    minHeight: '500px',
    marginTop: theme.spacing(5),
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2e5c4d',
    color: 'white',
  },
}));

function Registration() {
  const { token } = useContext(GlobalContext);

  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('password and confirm password not matched!!!');
      return;
    }

    const res = await registerUser(
      {
        firstName,
        lastName,
        email,
        role,
        password,
      },
      token,
    );

    if (res.status === 201 && res.data.error === null) {
      toast.success('User created successfully.');
    } else {
      toast.error(res.error);
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
  };

  return (
    <div className="new-blog-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitForm}>
          <Typography component="h1" variant="h5">
            Add New User
          </Typography>
          <hr />
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                select
                label="Role"
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option>select one</option>
                <option value="1">Viewer</option>
                <option value="2">Editor</option>
                <option value="3">Administrator</option>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="ConfirmPassword"
                label="Confirm Password"
                type="password"
                id="ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
