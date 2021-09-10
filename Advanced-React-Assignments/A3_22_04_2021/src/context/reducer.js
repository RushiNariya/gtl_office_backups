import {
  PLAY,
  PAUSE,
  PLAY_NEXT,
  PLAY_PREVIOUS,
  JUMP_TO_SLIDE,
} from './ActionTypes';
import images from '../images';

export const initialState = {
  isPlaying: true,
  isLoading: false,
  currIndex: 0,
  totalSlides: images.length,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return {
        ...state,
        isPlaying: true,
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false,
      };
    case PLAY_NEXT:
      return {
        ...state,
        currIndex: action.payload,
      };
    case PLAY_PREVIOUS:
      return {
        ...state,
        currIndex: action.payload,
      };
    case JUMP_TO_SLIDE:
      return {
        ...state,
        currIndex: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
