import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../context/GlobalState';
import Next from '../../assests/next.svg';
import Pause from '../../assests/pause.svg';
import Play from '../../assests/play.svg';
import Previous from '../../assests/previous.svg';
import Circle from '../../assests/circle.svg';
import useSlideshow from '../../customHooks/useSlideShow';
import './SlideControl.css';

function SlideControl({ slideIds }) {
  const updateSlide = useSlideshow();
  const { state, pauseImage, playImage } = useContext(GlobalContext);

  return (
    <>
      <div className="previous-container">
        <button
          type="submit"
          className="previous-button"
          onClick={() => updateSlide('previous')}
        >
          <img
            src={Previous}
            alt="Previous"
            className="previous-icon"
          />
        </button>
      </div>
      {state.isPlaying ? (
        <div className="pause-container">
          <button
            type="submit"
            className="pause-button"
            onClick={() => pauseImage()}
          >
            <img
              src={Pause}
              alt="Pause"
              className="pause-icon"
            />
          </button>
        </div>
      ) : (
        <div className="play-container">
          <button
            type="submit"
            className="play-button"
            onClick={() => playImage()}
          >
            <img
              src={Play}
              alt="Play"
              className="play-icon"
            />
          </button>
        </div>
      )}

      <div className="circle-container">
        {slideIds.map((id, index) => (
          <div className="circle-item" key={id}>
            <button
              type="submit"
              className="circle-button"
              onClick={() => updateSlide(index)}
            >
              <img
                src={Circle}
                alt="Circle"
                className={state.currIndex === index ? 'active circle-icon' : 'circle-icon'}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="next-container">
        <button
          type="submit"
          className="next-button"
          onClick={() => updateSlide('next')}
        >
          <img
            src={Next}
            alt="next"
            className="next-icon"
          />
        </button>
      </div>
    </>
  );
}

SlideControl.propTypes = {
  slideIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default SlideControl;
