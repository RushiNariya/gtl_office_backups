export const getPosition = (): any => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getCurrentWeatherDataApi = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const api_call = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
  );
  const data = await api_call.json();
  return data;
};

export const getSearchCityWeatherDataApi = async (
  city: string
): Promise<any> => {
  const api_call = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
  );
  const data = await api_call.json();
  return data;
};

export const hourlyDataApi = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const api_call = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API}&units=metric`
  );
  const data = await api_call.json();
  return data;
};
