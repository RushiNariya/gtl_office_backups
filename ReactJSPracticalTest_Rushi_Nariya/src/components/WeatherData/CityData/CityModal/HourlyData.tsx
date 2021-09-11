import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../context/InitialState';
import weatherInfo from '../../../../intefaces/weatherInfo';

function HourlyData(): JSX.Element {
  const { data } = useContext(GlobalContext);

  const init: weatherInfo = {};

  const [weatherData, setWeatherData] = useState(init);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);
  return (
    <>
      <div className="weather-by-hour">
        <h2 className="weather-by-hour__heading">Todays weather</h2>
        <div className="weather-by-hour__container">
          {weatherData.forecastHourly?.map((item, index) => {
            return (
              <div key={index} className="weather-by-hour__item">
                <div className="weather-by-hour__hour">{item.dt}</div>
                <img
                  className="flag"
                  src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                />
                <div>{item.temp}°C</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HourlyData;
