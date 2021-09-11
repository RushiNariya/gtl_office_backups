import React, { Component, Fragment } from "react";
import { Provider } from "react-redux";

import configureStore from "../src/store/index";
import Header from "./components/Header";
import ImageGrid from "./components/ImageGrid";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <ImageGrid />
      </Fragment>
    </Provider>
  );
}

export default App;
