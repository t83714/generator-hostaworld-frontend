import { takeEvery, takeLatest } from "redux-saga/effects";
import { APP_INIT } from "../actions/types";
import updateAppInit from "./updateAppInit";

// eslint-disable-next-line no-unused-vars
function* AppSaga(store) {
    yield takeLatest(APP_INIT, updateAppInit);
}

export default AppSaga;
