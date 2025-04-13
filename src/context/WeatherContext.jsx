import { createContext, useState } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const [fiveDayForecast, setFiveDayForecast] = useState([]);
    const [tempType, setTempType] = useState(true);
    let lat, lon;

    return(
        <WeatherContext.Provider value={{weatherData, setWeatherData, airQuality, setAirQuality, fiveDayForecast, setFiveDayForecast, tempType, setTempType, lat, lon}}>
            {children}
        </WeatherContext.Provider>
    )
}