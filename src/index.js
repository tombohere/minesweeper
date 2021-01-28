import React from "react";
import ReactDOM from "react-dom";
import { DataProvider } from "./Context";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  rootElement
);
