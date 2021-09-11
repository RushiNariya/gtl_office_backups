import React, { useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import suggestions from '../../Data/cities';
import { getSearchCityWeatherDataApi } from '../../Api/weatherAPI';
import './SearchCity.css';
import cityInfo from '../../intefaces/cityInfo';
import { GlobalContext } from '../../context/InitialState';

function SearchCity(): JSX.Element {
  const { searchCityHandler, errorHandler, resetSetErrorHandler } =
    useContext(GlobalContext);

  const initData: Array<{ id: number; city: string; }> = [];

  const [searchCity, setSearchCity] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(initData);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [value, setValue] = useState('');

  const handleSubmit = (e): void => {
    e.preventDefault();
    setValue(searchCity);
    setSearchCity('');
  };

  const getWeatherByCity = async (): Promise<any> => {
    const data = await getSearchCityWeatherDataApi(value);

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
      toast.error(data.message);
      errorHandler(data.message);
    }
    setSearchCity('');
  };

  useEffect(() => {
    if (value) {
      getWeatherByCity();
    }
  }, [value]);

  const onClick = (e): void => {
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    setActiveSuggestion(0);
    setValue(e.currentTarget.innerText);
    setSearchCity('');
  };

  const onChange = (e): void => {
    setSearchCity(e.target.value);

    if (searchCity.length < 2) {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestion(0);
    }

    if (searchCity.length > 1) {
      const filteredSuggestions = suggestions.filter((suggestion) => {
        if (suggestion.city.toLowerCase().indexOf(searchCity.toLowerCase()) >= 0) {
          return suggestion;
        }
      });
      setFilteredSuggestions(filteredSuggestions);
      setShowSuggestions(true);
      setActiveSuggestion(0);
    }
  };

  const onKeyDown = (e): void => {
    // pressed the enter key
    if (e.keyCode === 13) {
      if (filteredSuggestions.length > 0) {
        setSearchCity(filteredSuggestions[activeSuggestion].city);
      } else {
        setSearchCity(e.target.value);
      }
      setShowSuggestions(false);
      setActiveSuggestion(0);
    }
    // pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion((preValue) => preValue - 1);
    }
    // pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestion((preValue) => preValue + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && searchCity) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) {
              className = 'suggestion-active';
            }
            return (
              <li className={className} key={suggestion.id} onClick={onClick}>
                {suggestion.city}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div className="no-suggestions">
          <em>No suggestions, you are on your own!</em>
        </div>
      );
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="pseudo-search">
          <input
            type="text"
            required
            placeholder="Search City"
            value={searchCity}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <button className="fa fa-search" type="submit"></button>
        </div>
        {suggestionsListComponent}
      </form>
    </>
  );
}
export default SearchCity;
