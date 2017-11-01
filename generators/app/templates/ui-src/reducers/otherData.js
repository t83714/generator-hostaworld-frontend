import { OTHER_DATA_UPDATE } from "../actions/types";

export const init = function () {
    return {};
};

const initState = init();

function otherData(state = initState, action) {
    switch (action.type) {
    case OTHER_DATA_UPDATE: return { ...state, ...action.payload };
    default: return state;
    }
}

export default otherData;
