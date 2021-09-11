import React from 'react';
import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Avatar,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';

const drawerWidth = '20%';

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: '#f9f9f9',
    width: '100%',
    padding: theme.spacing(3),
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: 'flex',
  },
  active: {
    backgroundColor: '#f4f4f4',
  },
  title: {
    padding: theme.spacing(2),
  },
  appbar: {
    width: `calc(100% - ${drawerWidth})`,
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(2),
  },
}));

function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: '/create',
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.date}>
            {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography variant="h6">Rushi</Typography>
          <Avatar src="/user.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            My Notes
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}>hi</div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
