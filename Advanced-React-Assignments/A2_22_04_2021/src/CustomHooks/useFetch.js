import { useReducer, useEffect } from 'react';

const initialState = {
  isLoading: true,
  data: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };
    case 'FETCH_TODOS_FAILURE':
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

function useFetch(url) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_TODOS_REQUEST' });
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: res });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error });
      });
  }, [url]);

  return state;
}

export default useFetch;
