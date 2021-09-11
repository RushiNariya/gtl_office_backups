/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import moment from 'moment';
import { hourlyDataApi } from '../../../../Api/weatherAPI';
import './CityModal.css';
import weatherInfo from '../../../../intefaces/weatherInfo';
import cityInfo from '../../../../intefaces/cityInfo';
import CurrentData from './CurrentData';
import HourlyData from './HourlyData';
import DailyData from './DailyData';
import { GlobalContext } from '../../../../context/InitialState';

type props = {
  show: boolean;
  setShow: (data: boolean) => void;
  cityData: cityInfo;
};

function CityModal({ show, setShow, cityData }: props): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { setWeatherDataHandler, errorHandler, resetSetErrorHandler, data } =
    useContext(GlobalContext);

  const getWeatherByCity = async () => {
    const hourlyResponse = await hourlyDataApi(
      cityData.latitude,
      cityData.longitude
    );

    if (hourlyResponse?.cod !== 401) {
      resetSetErrorHandler();

      const response: weatherInfo = {
        city: cityData.name,
        country: cityData.country,
        data: new Date(hourlyResponse.current.dt * 1000),
        description: hourlyResponse.current.weather[0].description,
        main: {
          temp: cityData.temp,
          feels_like: hourlyResponse.current.feels_like,
          temp_min: cityData.minTemp,
          temp_max: cityData.maxTemp,
          pressure: hourlyResponse.current.pressure,
          humidity: hourlyResponse.current.humidity,
        },
        sunrise: new Date(hourlyResponse.current.sunrise * 1000),
        sunset: new Date(hourlyResponse.current.sunset * 1000),
        clouds: hourlyResponse.current.clouds,
        wind: hourlyResponse.current.wind_speed,
        longitude: hourlyResponse.lon,
        latitude: hourlyResponse.lat,
        icon: cityData.icon,
        forecastDaily: hourlyResponse.daily.slice(1).map((item) => {
          return {
            dt: new Date(item.dt * 1000),
            clouds: item.weather[0].main,
            main: item.weather[0].main,
            tempMin: item.temp.min,
            tempMax: item.temp.max,
            icon: item.weather[0].icon,
            humidity: item.humidity,
            wind: item.wind_speed,
          };
        }),
        forecastHourly: hourlyResponse.hourly.slice(23).map((item) => {
          return {
            dt: moment(new Date(item.dt * 1000)).format('hh A'),
            main: item.weather[0].main,
            temp: item.temp,
            icon: item.weather[0].icon,
          };
        }),
      };

      setWeatherDataHandler(response);
    } else {
      toast.error(hourlyResponse?.message);
      errorHandler(hourlyResponse?.message);
    }
  };
  useEffect(() => {
    if (show) {
      getWeatherByCity();
    }
  }, [show]);

  useEffect(() => {
    setInterval(() => getWeatherByCity(), 3600000);
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <div className="modal">
        <Modal show={show} fullscreen="xxl-down" onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading ? (
              <p>loading ...</p>
            ) : (
              <main className="main-container">
                <CurrentData />
                <HourlyData />
                <DailyData />
              </main>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

CityModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  cityData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    maxTemp: PropTypes.number.isRequired,
    minTemp: PropTypes.number.isRequired,
  }).isRequired,
};

export default CityModal;
