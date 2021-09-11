import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppTitle from './AppTitle/AppTitle';
import './App.css';
import WeatherData from './WeatherData/CityList';
import SearchCity from './SearchCity/SearchCity';

function App(): JSX.Element {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            borderRadius: '10px',
            background: '#fff',
            padding: '1rem',
            color: '#000',
          },
        }}
      />
      <AppTitle />
      <SearchCity />
      <WeatherData />
    </div>
  );
}

export default App;
