import "babel-polyfill";
import "raf";
import "bootstrap";
import React from "react";
import { render } from "react-dom";
import "../scss/main.scss";
import App from "./app";

render(<App />, document.getElementById("app-container"));
