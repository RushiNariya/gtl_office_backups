import React, { useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { getCurrentWeatherDataApi, getPosition } from '../../Api/weatherAPI';
import City from './CityData/City';
import './CityList.css';
import cityInfo from '../../intefaces/cityInfo';
import { GlobalContext } from '../../context/InitialState';

function WeatherData(): JSX.Element {
  const { searchCityHandler, errorHandler, resetSetErrorHandler, city } =
    useContext(GlobalContext);

  const getWeather = async (latitude: any, longitude: any): Promise<any> => {
    const data = await getCurrentWeatherDataApi(latitude, longitude);
    if (data.cod === 200) {
      resetSetErrorHandler();

      const cityData: cityInfo = {
        name: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        longitude: data.coord.lon,
        latitude: data.coord.lat,
        maxTemp: data.main.temp_max,
        minTemp: data.main.temp_min,
      };
      searchCityHandler(cityData);
    } else {
      errorHandler(data.message);
    }
  };

  useEffect(() => {
    getPosition()
      .then((position: any) => {
        getWeather(position.coords.latitude, position.coords.longitude);
        setInterval(
          () => getWeather(position.coords.latitude, position.coords.longitude),
          3600000
        );
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  return (
    <>
      {city.length ? (
        <ul className="city-list">
          {city.map((item) => {
            return (
                <li key={item.name} className="city-element">
                  <City cityData={item} />
                </li>
            );
          })}
        </ul>
      ) : <div className="city-list">No cities Found!</div>}
    </>
  );
}

export default WeatherData;
