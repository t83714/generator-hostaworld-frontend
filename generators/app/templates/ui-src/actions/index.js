import {
    APP_INIT,
    OTHER_DATA_UPDATE,
} from "./types";

export function appInit() {
    return {
        type: APP_INIT,
        payload: null,
    };
}

export function otherDataUpdate(otherData) {
    return {
        type: OTHER_DATA_UPDATE,
        payload: otherData,
    };
}
