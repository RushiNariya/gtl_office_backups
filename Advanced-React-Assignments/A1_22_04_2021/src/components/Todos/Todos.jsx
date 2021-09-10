import {
  AppBar,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import TodoItem from './TodoItem';
import './Todos.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: '#009999',
  },
  grid: {
    marginTop: '100px',
    position: 'relative',
  },
});

function Todos() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://todojsonserver.herokuapp.com/todos')
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Container>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Todo Assignment 1
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} className={classes.grid}>
          <div className="todolist">
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className={classes.error}> No Todos Found</div>
            ) : (
              data.map((item) => <TodoItem key={item.id} todo={item} />)
            )}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default Todos;
