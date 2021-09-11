// import { LocalDining } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-css';

import { deleteNote, getNotes } from '../api/notesAPI';
import NotesCard from './NotesCard';

function Notes({ history }) {
  const [notes, setNotes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(async () => {
    const res = await getNotes();
    // console.log(res.data);
    setNotes(res.data);
  }, [isDeleting]);

  const handleDelete = async (id) => {
    await deleteNote(id);
    history.push('/');
    setIsDeleting(!isDeleting);
  };

  // if (notes.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes
          ? notes.map((note) => (
            <div key={note.id}>
              <NotesCard note={note} handleDelete={handleDelete} />
            </div>
          ))
          : 'Loading...'}
      </Masonry>
    </Container>
  );
}

Notes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Notes;
