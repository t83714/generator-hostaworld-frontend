import React from "react";
import { connect } from "react-redux";
import { otherDataUpdate } from "../actions";

const MainView = (props) => {
    return (
        <div>
            <h1>{props.isAppInit}</h1>
            <input type="text" onChange={(e) => { props.dispatch(otherDataUpdate({ value: e.target.value })); }} />
        </div>);
};

const mapStateToProps = state => ({
    isAppInit: state.isAppInit,
});

export default connect(mapStateToProps)(MainView);
