import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { I18nContextProvider } from './i18n';
import { languages } from './locales';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <I18nContextProvider languages={languages}>
      <App />
    </I18nContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
