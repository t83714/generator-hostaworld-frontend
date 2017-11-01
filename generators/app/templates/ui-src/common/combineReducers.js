export default function combineReducers(reducers) {
    if (typeof reducers !== "object") throw new Error("combineReducers: Invalid `reducers` parameter!");
    let count = 0;
    for (const key in reducers) {
        if (typeof reducers[key] !== "function") throw new Error(`combineReducers: Invalid non-function \`${key}\` property of \`reducers\` parameter.`);
        count++;
    }
    if (!count) throw new Error("combineReducers: Invalid `reducers` parameter, no function property found!");
    return function (state, action) {
        const newState = { ...state };
        let state_changed = false;
        for (const key in reducers) {
            const newValue = reducers[key](newState[key], action);
            if (newValue != newState[key]) state_changed = true;
            newState[key] = newValue;
        }
        if (!state_changed) return state;
        return newState;
    };
}
