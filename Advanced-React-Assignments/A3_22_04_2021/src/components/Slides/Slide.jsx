import React from 'react';
import PropTypes from 'prop-types';
import './Slide.css';

function Slide({ img }) {
  return (
    <div>
      <div className="image-title">{img.title}</div>
      <img src={img.image} alt={img.alt} className="image" />
    </div>
  );
}

Slide.propTypes = {
  img: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Slide;
