import React, { useContext } from 'react';
import SlideControl from '../SlideControl/SlideControl';
import Slide from './Slide';
import { GlobalContext } from '../../context/GlobalState';
import images from '../../images';

function Slides() {
  const { state } = useContext(GlobalContext);

  return (
    <div className="slide-image">
      <Slide img={images[state.currIndex]} />
      <SlideControl slideIds={images.map((item) => [item.id])} />
    </div>
  );
}

export default Slides;
