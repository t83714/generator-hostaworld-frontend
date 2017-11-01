import combineReducers from "../common/combineReducers";
import otherDataReducer, { init as otherDataInit } from "./otherData";
import {
    APP_INIT,
} from "../actions/types";

export const init = function () {
    return {
        otherData: otherDataInit(),
        isAppInit: false,
    };
};

const AppInitState = init();

// eslint-disable-next-line no-unused-vars
const globalReducer = function (state = AppInitState, action) {
    switch (action.type) {
    case APP_INIT:
        return {
            ...state,
            isAppInit: true,
        };
    default: return state;
    }
};


const combinedReducer = combineReducers({
    otherData: otherDataReducer,
});

const AppReducer = function (state = AppInitState, action) {
    let newState = globalReducer(state, action);
    newState = combinedReducer(newState, action);
    return newState;
};

export default AppReducer;
