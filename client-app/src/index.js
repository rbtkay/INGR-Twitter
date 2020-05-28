import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import reducer from "./reducer";

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById("root"));
