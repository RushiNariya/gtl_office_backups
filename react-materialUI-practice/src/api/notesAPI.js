import axios from 'axios';

export const getNotes = async () => axios
  .get('http://localhost:3000/api/notes/all')
  .then((res) => res.data)
  .catch((error) => {
    if (error.request.readyState === 4 && error.request.response !== '') {
      return error.response;
    }
    return { status: 999 };
  });

export const postNote = async (note) => axios
  .post('http://localhost:3000/api/notes/add', note)
  .then((res) => res)
  .catch((error) => {
    if (error.request.readyState === 4 && error.request.response !== '') {
      return error.response;
    }
    return { status: 999 };
  });

export const deleteNote = async (id) => axios
  .delete(`http://localhost:3000/api/notes/${id}`)
  .then((res) => res)
  .catch((error) => {
    if (error.request.readyState === 4 && error.request.response !== '') {
      return error.response;
    }
    return { status: 999 };
  });
