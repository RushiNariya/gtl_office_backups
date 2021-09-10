import React from 'react';
import Slides from './components/Slides/Slides';
import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Slides />
      </div>
    </GlobalProvider>
  );
}

export default App;
