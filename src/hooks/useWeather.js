import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { fetchAirQuality, fetchCoordinates, fetchForecast, fetchWeatherData } from "../api/weatherApi";

export const useWeather = () => {
    const {weatherData, setWeatherData, airQuality, setAirQuality, fiveDayForecast, setFiveDayForecast, tempType, setTempType, lat, lon} = useContext(WeatherContext);

    const getWeather = async (place) => {
        let lat, lon;
        if(typeof place === "string") {
            ( {lat, lon} = await fetchCoordinates(place));
        }
        else if (typeof place === "object" && place.lat && place.lon) {
            lat = place.lat;
            lon = place.lon;
        }
        const weather = await fetchWeatherData(lat, lon);
        setWeatherData(weather);

        const aqi = await fetchAirQuality(lat, lon);
        setAirQuality(aqi);

        const forecast = await fetchForecast(lat, lon);
        setFiveDayForecast(forecast);

    }

    return {getWeather, weatherData, airQuality, fiveDayForecast, tempType, setTempType, lat: weatherData?.coord?.lat, lon: weatherData?.coord?.lon};
}