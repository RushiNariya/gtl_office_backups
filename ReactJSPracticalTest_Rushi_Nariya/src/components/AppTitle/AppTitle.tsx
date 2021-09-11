import React from 'react';
import { Navbar } from 'react-bootstrap';
import weatherLogo from '../../assets/weather-app.png';
import './AppTitle.css';

function AppTitle(): JSX.Element {
  return (
    <Navbar bg-transparent="true" expand="lg">
      <Navbar.Brand href="#" className="text-white app__title">
        <span>
          <img src={weatherLogo} className="weather__logo" />
        </span>
        Weather App
      </Navbar.Brand>
    </Navbar>
  );
}

export default AppTitle;
