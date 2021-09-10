import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, CssBaseline, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { GlobalContext } from '../../context/globalProvider';
import './Login.css';
import { loginUser } from '../../API/UserApi';

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
    minHeight: '320px',
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

function Login() {
  const { userLogin, token } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    toast(
      <div>
        <h6>For temporary Login:</h6>
        <p>admin123@gmail.com</p>
        <p>password</p>
      </div>,
    );
  }, []);

  if (token) {
    history.replace('/blogs');
  }

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('login credentials are required!');
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
      history.replace('/blogs');
    } else {
      toast.error(res.error);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="new-blog-container">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={submitForm}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <hr />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
