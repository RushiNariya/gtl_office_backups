/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

function useSlideshow(timeout = 4000) {
  const {
    state,
    playNextImage,
    playPreviousImage,
    jumpToSlideImage,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (state.isPlaying) {
      const timer = setTimeout(
        () => playNextImage((state.currIndex + 1) % state.totalSlides),
        timeout,
      );

      return () => clearTimeout(timer);
    }
  }, [state]);

  const updateSlide = (direction) => {
    if (typeof direction === 'number') {
      return jumpToSlideImage(direction);
    }

    if (direction === 'next') {
      return playNextImage((state.currIndex + 1) % state.totalSlides);
    }

    return playPreviousImage(
      (state.currIndex - 1 + state.totalSlides) % state.totalSlides,
    );
  };

  return updateSlide;
}

export default useSlideshow;
