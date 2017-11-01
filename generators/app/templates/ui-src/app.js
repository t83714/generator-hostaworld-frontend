import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import AppReducer, { init as AppStateInit } from "./reducers";
import AppSaga from "./sagas";

import MainView from "./views/MainView";

import { appInit } from "./actions";

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const store = createStore(
    AppReducer,
    AppStateInit(),
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(AppSaga, store);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        store.dispatch(appInit());
    }

    render() {
        return (<Provider store={store}><MainView /></Provider>);
    }
}

export default App;
