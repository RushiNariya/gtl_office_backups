import React from 'react';
import ReactDOM from 'react-dom';

import { I18nContextProvider } from './i18n';
import { languages } from './locales';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <I18nContextProvider languages={languages}>
      <App />
    </I18nContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
