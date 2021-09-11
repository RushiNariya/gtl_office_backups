import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import {
  blue, green, pink, yellow,
} from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === 'Work') {
        return yellow[700];
      }
      if (note.category === 'Money') {
        return green[500];
      }
      if (note.category === 'Todos') {
        return pink[700];
      }
      return blue;
    },
  },
  test: {
    boxShadow: (note) => {
      if (note.category === 'Work') {
        return '0 0 10px -1px yellow';
      }
      if (note.category === 'Todos') {
        return '0 0 10px 0px pink';
      }
      if (note.category === 'Money') {
        return '0 0 10px -1px green';
      }
      return 'none';
    },
  },
});

function NotesCard({ note, handleDelete }) {
  const classes = useStyles(note);
  return (
    <Card elevation={1} className={classes.test}>
      <CardHeader
        avatar={
          (
            <Avatar className={classes.avatar}>
              {note.category[0].toUpperCase()}
            </Avatar>
          )
        }
        action={
          (
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutline />
            </IconButton>
          )
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}

NotesCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default NotesCard;
