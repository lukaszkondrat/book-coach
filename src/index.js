import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BookingsContextProvider } from "./store/bookings-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BookingsContextProvider>
    <App />
  </BookingsContextProvider>
);
