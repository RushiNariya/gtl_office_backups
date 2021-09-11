import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { GlobalContext } from '../../../../context/InitialState';
import weatherInfo from '../../../../intefaces/weatherInfo';

function CurrentData(): JSX.Element {
  const { data } = useContext(GlobalContext);

  const init: weatherInfo = {};

  const [weatherData, setWeatherData] = useState(init);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);

  return (
    <>
      <div className="location-and-date">
        <h1 className="location-and-date__location">
          {weatherData.city}, {weatherData.country}
        </h1>
        <div>{moment(weatherData.data).format('dddd, MMMM Do YYYY')}</div>
      </div>
      <div className="current-temperature">
        <div className="current-temperature__icon-container">
          <img
            className="current-temperature__icon"
            src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
          />
        </div>
        <div className="current-temperature__content-container">
          <div className="current-temperature__value">
            {weatherData.main?.temp}
            <span className="temp__degree">°C</span>
          </div>
          <div className="current-temperature__summary">
            {weatherData.description}
          </div>
        </div>
      </div>

      <div className="current-stats">
        <div>
          <div className="current-stats__value">
            {weatherData.main?.temp_max}°C
          </div>
          <div className="current-stats__label">High</div>
          <div className="current-stats__value">
            {weatherData.main?.temp_min}°C
          </div>
          <div className="current-stats__label">Low</div>
        </div>
        <div>
          <div className="current-stats__value">{weatherData.wind}m/s</div>
          <div className="current-stats__label">Wind</div>
          <div className="current-stats__value">
            {weatherData.main?.humidity}%
          </div>
          <div className="current-stats__label">Humidity</div>
        </div>
        <div>
          <div className="current-stats__value">
            {moment(weatherData.sunrise).format('hh:mm A')}
          </div>
          <div className="current-stats__label">Sunrise</div>
          <div className="current-stats__value">
            {moment(weatherData.sunset).format('hh:mm A')}
          </div>
          <div className="current-stats__label">Sunset</div>
        </div>
      </div>
    </>
  );
}

export default CurrentData;
