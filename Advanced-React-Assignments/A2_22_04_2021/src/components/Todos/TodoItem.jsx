import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { DoneAll, DoneAllOutlined } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '20px',
    backgroundColor: '#9ec9cf',
    fontWeight: '700',
    padding: '20px 20px',
    width: '90%',
    maxWidth: '700px',
    margin: '20px auto',
  },
}));

function TodoItem({ todo }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} key={todo.id}>
      <Paper className={classes.paper}>
        <FormControlLabel
          control={
            (
              <Checkbox
                icon={<DoneAllOutlined />}
                checkedIcon={<DoneAll />}
                name="checkedH"
                checked={todo.completed}
                color="primary"
              />
            )
          }
        />
        {todo.title}
      </Paper>
    </Grid>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
