import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import {
  playAction,
  pauseAction,
  playNextAction,
  playPreviousAction,
  jumpToSlideAction,
} from './ActionMethods';

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function playImage() {
    dispatch(playAction());
  }
  function pauseImage() {
    dispatch(pauseAction());
  }
  function playNextImage(id) {
    dispatch(playNextAction(id));
  }
  function playPreviousImage(id) {
    dispatch(playPreviousAction(id));
  }
  function jumpToSlideImage(id) {
    dispatch(jumpToSlideAction(id));
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        playImage,
        pauseImage,
        playNextImage,
        playPreviousImage,
        jumpToSlideImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
