import React from "react";
import { useWeather } from "../hooks/useWeather";
import { DateTime } from "luxon";

const Weather = () => {
  const { weatherData, tempType } = useWeather();
  if (!weatherData) return null;
  const timestamp = weatherData.dt;
  const dateTime = DateTime.fromSeconds(timestamp);
  const formattedDate = dateTime.toFormat("dd MMMM yyyy");
  const formattedTime = dateTime.toFormat("hh:mm a");
  const day = dateTime.toFormat("cccc");
  const clouds = weatherData.clouds.all;
  const weather = weatherData.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const tempCel = Math.trunc(weatherData.main.temp - 273.15);
  const tempFah = Math.trunc((weatherData.main.temp - 273.15) * 1.8 + 32);
  const tempFeelCel = Math.trunc(weatherData.main.feels_like - 273.15);
  const tempFeelFah = Math.trunc(
    (weatherData.main.feels_like - 273.15) * 1.8 + 32
  );

  return (
    <div className="flex flex-col ">
      <img src={iconUrl} alt={weather.description} className="w-48 dark:bg-white dark:bg-opacity-70 rounded-xl" />
      <h1 className="text-7xl">{tempType ? `${tempCel}°C` : `${tempFah}°F`}</h1>
      <p className="text-2xl font-semibold">
        Feels Like: {tempType ? `${tempFeelCel}°C` : `${tempFeelFah}°F`}
      </p>
      <div className="flex items-center text-2xl font-semibold gap-x-2">
        <p>{weather.description}</p>
        <img src={iconUrl} alt={weather.description} className="w-8 dark:bg-white dark:bg-opacity-70 rounded-md" />
      </div>
      <p className="text-2xl font-semibold mb-6 dark:text-white">Clouds: {clouds}%</p>
      <p className="text-xl">
        {weatherData?.name || "No Data"}, {weatherData?.sys.country || "No Data"}
      </p>
      <p className="text-xl">
        {day}
        {", "}
        {formattedTime}
      </p>
      <p className="text-xl">{formattedDate}</p>
    </div>
  );
};

export default Weather;
