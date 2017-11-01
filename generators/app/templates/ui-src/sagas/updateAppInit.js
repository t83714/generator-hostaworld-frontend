import { call, put } from "redux-saga/effects";
import { otherDataUpdate } from "../actions";

export default function* updateAppInit({ payload }) {
    try {
        yield put(otherDataUpdate({
            isAppInit: true,
        }));
    } catch (e) {
        // eslint-disable-next-line no-alert
        alert(`Failed to update store: ${e.message}`);
    }
}
