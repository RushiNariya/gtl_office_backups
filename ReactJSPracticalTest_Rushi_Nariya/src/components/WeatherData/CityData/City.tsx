import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './City.css';
import CityModal from './CityModal/CityModal';
import cityInfo from '../../../intefaces/cityInfo';
import { GlobalContext } from '../../../context/InitialState';

type props = {
  cityData: cityInfo;
};

function City({ cityData }: props): JSX.Element {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }

  const { removeCityHandler } =
    useContext(GlobalContext);
  const deleteSearchCity = (cityName: string) => {
    removeCityHandler(cityName);
  };
  return (
    <>
      <article className="city" onClick={() => handleShow()}>
        <div className="column-1">
          <div className="name">
            {cityData.name}
            <img
              className="flag"
              src={`http://openweathermap.org/img/wn/${cityData.icon}@2x.png`}
            />
          </div>
        </div>
        <div className="column-2">
          <div className="temp">
            <span className="units">{cityData.temp}</span>
            <span className="metrics">°C</span>
          </div>
        </div>
        <button
          className="cancel-button"
          onClick={() => deleteSearchCity(cityData.name)}
        >
          <p className="icon-cancel">x</p>
        </button>
      </article>
      {show && <CityModal show={show} setShow={setShow} cityData={cityData} />}
    </>
  );
}

City.propTypes = {
  cityData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default City;
