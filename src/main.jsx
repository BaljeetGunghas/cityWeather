import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WeatherProvider } from "./context/WeatherContext.jsx";
import { DarkModeContextProvider } from "./context/DarkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WeatherProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </WeatherProvider>
  </React.StrictMode>
);
