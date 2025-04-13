import React, { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { WiSunset } from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";
import { DateTime } from "luxon";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { FaTemperatureLow } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Aqi from "./Aqi";
import Map from "./Map";
const Highlights = () => {
  
  const { weatherData, airQuality, tempType } = useWeather();
  const [timeZone, setTimeZone] = useState(null);

  const fetchTimeZone = async (latitude, longitude) => {
    const API = import.meta.env.VITE_ZONE_KEY;
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${API}&format=json&by=position&lat=${latitude}&lng=${longitude}`
    );
    const data = await response.json();
    return data.zoneName;
  };


  useEffect(() => {
    const getTimeZone = async () => {
      const { coord } = weatherData;
      const timeZone = await fetchTimeZone(coord.lat, coord.lon);
      setTimeZone(timeZone);
    };

    if (weatherData) {
      getTimeZone();
    }
  }, [weatherData]);

  if (!weatherData || !timeZone) return null;
  if (!airQuality) return null;
  const { sunrise, sunset } = weatherData.sys;
  const sunriseTime = DateTime.fromSeconds(sunrise).setZone(timeZone);
  const sunsetTime = DateTime.fromSeconds(sunset).setZone(timeZone);
  const formattedSunriseTime = sunriseTime.toLocaleString(DateTime.TIME_SIMPLE);
  const formattedSunsetTime = sunsetTime.toLocaleString(DateTime.TIME_SIMPLE);
  const humidity = weatherData.main.humidity;
  const aqi = airQuality.main.aqi;
  const tempMaxCel = Math.trunc(weatherData.main.temp_max - 273.15);
  const tempMinCel = Math.trunc(weatherData.main.temp_min - 273.15);
  const tempMaxFah = Math.trunc(
    (weatherData.main.temp_max - 273.15) * 1.8 + 32
  );
  const tempMinFah = Math.trunc(
    (weatherData.main.temp_min - 273.15) * 1.8 + 32
  );
  const windSpeed = weatherData.wind.speed;
  const visibility = weatherData.visibility / 1000;

  return (
    <div className="h-full mt-0 lg:mt-16 xl:mt-10 2xl:mt-0 ">
      <h1 className="text-3xl font-semibold mb-5">Current Weather</h1>

      <div className="flex flex-col xl:grid grid-cols-4 grid-rows-2 gap-4 lg:h-80 overflow-y-auto ">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 flex flex-col items-center shadow-lg hover:shadow-2xl">
          <h1 className="text-lg text-gray-500 dark:text-white font-normal">
            Sunrise/Sunset
          </h1>
          <div className="flex text-2xl gap-x-4">
            <p className="flex flex-col items-center">
              <WiSunrise className="text-yellow-400 text-7xl" />{" "}
              {formattedSunriseTime}
            </p>
            <p className="flex flex-col items-center">
              <WiSunset className="text-yellow-400 text-7xl" />{" "}
              {formattedSunsetTime}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-lg hover:shadow-2xl flex flex-col w-full">
          <Aqi aqi={aqi} />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 flex flex-col items-center shadow-lg hover:shadow-2xl">
          <h1 className="text-lg text-gray-500 dark:text-white font-normal">Humidity</h1>
          <div className="flex flex-col items-center">
            <WiHumidity className="text-blue-400 text-7xl" />{" "}
            <p className="text-2xl">{humidity}%</p>
          </div>
        </div>
        <div className="col-start-1 row-start-2 bg-white dark:bg-slate-900 rounded-3xl flex flex-col items-center p-2 shadow-lg hover:shadow-2xl">
          <h1 className="text-lg text-gray-500 dark:text-white font-normal">Max/Min Temp</h1>
          <div className="flex text-2xl gap-x-4 gap-y-5 mt-3">
            <p className="flex flex-col items-center">
              <FaTemperatureHigh className="text-red-400 text-6xl" />{" "}
            </p>
            <p className="flex flex-col items-center">
              <FaTemperatureLow className="text-blue-400 text-6xl" />{" "}
            </p>
          </div>
          <div className="flex w-full justify-center gap-x-8 lg:gap-x-0 lg:justify-evenly text-2xl">
            {tempType ? (
              <>
                <span>{tempMaxCel}°C</span>
                <span>{tempMinCel}°C</span>
              </>
            ) : (
              <>
                <span>{tempMaxFah}°F</span>
                <span>{tempMinFah}°F</span>
              </>
            )}
          </div>
        </div>
        <div className="col-start-2 row-start-2 bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-lg hover:shadow-2xl flex flex-col items-center">
          <h1 className="text-lg text-gray-500 dark:text-white font-normal">Wind Status</h1>
          <div className="flex flex-col items-center">
            <FaWind className="text-blue-400 text-7xl" />{" "}
            <p className="text-2xl">{windSpeed} km/h</p>
          </div>
        </div>
        <div className="col-start-3 row-start-2 bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-lg hover:shadow-2xl flex flex-col items-center">
        <h1 className="text-lg text-gray-500 dark:text-white font-normal">Visibility</h1>
          <div className="flex flex-col items-center">
            <IoMdEye className="text-amber-400 text-7xl" />{" "}
            <p className="text-2xl">{visibility} km</p>
          </div>
        </div>
        <div className="row-span-2 col-start-4 row-start-1 bg-white dark:bg-slate-900 rounded-3xl shadow-lg hover:shadow-2xl">
          <Map/>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
