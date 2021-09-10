import React, { useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context/globalProvider';
import './Navigation.css';
import SearchBox from '../SearchBox/SearchBox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navigation() {
  const classes = useStyles();
  const { token, role } = useContext(GlobalContext);

  return (
    <div className={classes.root}>
      <AppBar className="appbar" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/blogs" className="navlink" exact>
              Blogs
            </NavLink>
          </Typography>
          {token && window.location.pathname === '/blogs' ? <SearchBox /> : null}
          {token ? (
            <>
              {role === 'administrator' ? (
                <>
                  <Button color="inherit">
                    <NavLink to="/addUser" className="navlink" exact>
                      <strong> Add User</strong>
                    </NavLink>
                  </Button>
                </>
              ) : null}
              {role === 'administrator' || role === 'editor' ? (
                <>
                  <Button color="inherit">
                    <NavLink to="/addblog" className="navlink" exact>
                      <strong> Add Blog</strong>
                    </NavLink>
                  </Button>
                </>
              ) : null}

              <Button color="inherit" variant="outlined">
                <NavLink to="/logout" className="navlink" exact>
                  <strong> Logout</strong>
                </NavLink>
              </Button>
            </>
          ) : (
            <Button color="inherit" variant="outlined">
              <NavLink to="/" className="navlink" exact>
                <strong> Login</strong>
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navigation;
