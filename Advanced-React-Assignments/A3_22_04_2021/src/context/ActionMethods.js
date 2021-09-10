import {
  PLAY,
  PAUSE,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  JUMP_TO_SLIDE,
} from './ActionTypes';

export const playAction = () => ({
  type: PLAY,
});

export const pauseAction = () => ({
  type: PAUSE,
});

export const playNextAction = (slideId) => ({
  type: PLAY_NEXT,
  payload: slideId,
});

export const playPreviousAction = (slideId) => ({
  type: PLAY_PREVIOUS,
  payload: slideId,
});

export const jumpToSlideAction = (slideId) => ({
  type: JUMP_TO_SLIDE,
  payload: slideId,
});
