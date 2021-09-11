import {
  Typography,
  Button,
  Container,
  TextField,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from '@material-ui/core';
// import AcUnitOutlinedIcon from '@material-ui/icons/AcUnitOutlined';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { postNote } from '../api/notesAPI';
// const useStyles = makeStyles({
// btn: {
//   fontSize: 60,
//   backgroundColor: 'violet',
//   '&:hover': {
//     backgroundColor: 'blue',
//   },
// },
// title: {
//   textDecoration: 'underline',
//   marginBottom: 20,
// },
// });

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

function Create({ history }) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCotegory] = useState('Todos');
  // console.log(props);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDetailsError(false);
    setTitleError(false);
    if (title === '') {
      setTitleError(true);
    }
    if (details === '') {
      setDetailsError(true);
    }
    if (category === '') {
      setDetailsError(true);
    }
    if (title && details) {
      // console.log(title, details, category);
      const res = await postNote({ title, details, category });
      console.log(res);
      if (res.status === 201) {
        history.push('/');
      } else {
        history.push('/create');
      }
    }
  };
  return (
    <Container>
      <Typography
        // className={classes.title}
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
        // align="center"
        // nowrap
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCotegory(e.target.value)}
          >
            <FormControlLabel value="Money" control={<Radio />} label="Money" />
            <FormControlLabel value="Todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminders"
            />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
            {/* <Radio value="hello" />
          <Radio value="goodby" /> */}
          </RadioGroup>
        </FormControl>

        <Button
          // className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          // startIcon={<SendIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup> */}
      <br />
      {/* <AcUnitOutlinedIcon /> */}
    </Container>
  );
}

Create.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // history: PropTypes.instanceOf(RouteComponentProps.history).isRequired,
};

export default Create;
