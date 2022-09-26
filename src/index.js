import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Main from "./Main";

const cors = require("cors");

// App.use(cors());

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Main/>
  </React.StrictMode>,
  rootElement
);
