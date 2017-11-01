import { call, put } from "redux-saga/effects";
import { optionDataUpdate } from "../actions";

export default function* updateAppInit({ payload }) {
    try {
        yield put(optionDataUpdate({
            isAppInit: true,
        }));
    } catch (e) {
        // eslint-disable-next-line no-alert
        alert(`Failed to update store: ${e.message}`);
    }
}
