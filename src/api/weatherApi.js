const API_KEY = import.meta.env.VITE_API_KEY

export const fetchCoordinates = async (place) => {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`);
    const data = await response.json();
    return data[0];
}

export const fetchWeatherData = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}

export const fetchAirQuality = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    return data.list[0];
};

export const fetchForecast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data = await response.json();
    return data.list;
}