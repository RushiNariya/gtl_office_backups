import { takeEvery, put } from "redux-saga/effects";

function* workerSaga() {
  console.log("worker saga");
  yield put({ type: "ACTION_FROM_WORKER" });
}

//watcher saga
function* rootSaga() {
  //   console.log("hey Saga");
  yield takeEvery("Hello", workerSaga);
}

export default rootSaga;

// watcher saga -> actions ->worker saga
