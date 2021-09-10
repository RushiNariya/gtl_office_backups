import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import GlobalState from './context/GlobalState';
import './index.css';
import App from './App';
import { LayoutProvider } from './context/LayoutContext/LayoutContext';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <GlobalState>
        <Provider store={store}>
          <App />
        </Provider>
      </GlobalState>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
reportWebVitals();
