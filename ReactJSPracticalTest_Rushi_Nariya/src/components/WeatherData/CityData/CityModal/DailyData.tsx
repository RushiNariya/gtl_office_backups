import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { GlobalContext } from '../../../../context/InitialState';
import weatherInfo from '../../../../intefaces/weatherInfo';

function DailyData(): JSX.Element {

  const {
    data,
  } = useContext(GlobalContext);

  const init: weatherInfo = {};

  const [weatherData, setWeatherData] = useState(init);

  useEffect(() => {
    setWeatherData(data);
  }, [data]);
  return (
    <>
      <div className="next-5-days">
        <h2 className="next-5-days__heading">Next 7 days</h2>
        <div className="next-5-days__container">
          {weatherData.forecastDaily?.map((item, index) => {
            return (
              <div key={index} className="next-5-days__row">
                <div className="next-5-days__date">
                  {moment(item.dt).format('dddd')}
                  <div className="next-5-days__label">
                    {moment(item.dt).format('DD/MM')}
                  </div>
                </div>

                <div className="next-5-days__low">
                  {item.tempMin}°C
                  <div className="next-5-days__label">Low</div>
                </div>

                <div className="next-5-days__high">
                  {item.tempMax}°C
                  <div className="next-5-days__label">High</div>
                </div>

                <div className="next-5-days__icon">
                  <img
                    className="flag"
                    src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
                  />
                </div>

                <div className="next-5-days__rain">
                  {item.humidity}%
                  <div className="next-5-days__label">Humidity</div>
                </div>

                <div className="next-5-days__wind">
                  {item.wind} m/s
                  <div className="next-5-days__label">Wind</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DailyData;
