import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import { GlobalProvider } from './context/GlobalState';

import './index.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
