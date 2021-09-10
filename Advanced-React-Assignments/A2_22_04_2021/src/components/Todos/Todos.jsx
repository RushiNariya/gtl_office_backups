import {
  AppBar,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import useFetch from '../../CustomHooks/useFetch';
import useInfiniteScroll from '../../CustomHooks/useInfiniteScroll';
import Loader from '../Loader/Loader';
import TodoItem from './TodoItem';
import './Todos.css';

const useStyles = makeStyles({
  error: {
    backgroundColor: 'white',
    position: 'absolute',
    height: '100%',
    width: '100%',
    textAlign: 'center',
    marginTop: '2rem',
    fontWeight: '700',
    color: 'grey',
  },
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

  const { isLoading, data, error } = useFetch('https://todojsonserver.herokuapp.com/todos');
  const infiniteScroll = useInfiniteScroll();

  return (
    <div className={classes.root}>
      <Container>
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Todo Assignment 2
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
              data.slice(0, infiniteScroll).map((item) => <TodoItem key={item.id} todo={item} />)
            )}
          </div>
        </Grid>
      </Container>
    </div>
  );
}

export default Todos;
