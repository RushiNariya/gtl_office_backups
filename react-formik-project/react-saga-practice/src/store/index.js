import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas";

import rootReducer from "../reducers";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  sagaMiddleware.run(rootSaga);
  store.dispatch({ type: "Hello" });

  // const configureStore = () => {
  //   const sagaMiddleware = createSagaMiddleware();
  //   const store = createStore(
  //     rootReducer,
  //     window.__REDUX_DEVTOOLS_EXTENSION__
  //       ? compose(
  //           applyMiddleware(sagaMiddleware),
  //           window.__REDUX_DEVTOOLS_EXTENSION__()
  //         )
  //       : applyMiddleware(sagaMiddleware)
  //   );
  //   sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
