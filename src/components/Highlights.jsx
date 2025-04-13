import { useEffect, useState } from "react";
import { useWeather } from "../hooks/useWeather";
import {
  WiSunset,
  WiSunrise,
  WiHumidity,
  WiBarometer,
  WiDaySunny,
} from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow, FaWind } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { DateTime } from "luxon";
import Aqi from "./Aqi";
import Map from "./Map";

const Highlights = () => {
  const { weatherData, airQuality, tempType } = useWeather();
  const [timeZone, setTimeZone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimeZone = async (latitude, longitude) => {
    const API = import.meta.env.VITE_ZONE_KEY;
    try {
      const response = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${API}&format=json&by=position&lat=${latitude}&lng=${longitude}`
      );
      if (!response.ok) throw new Error("Failed to fetch timezone");
      const data = await response.json();
      return data.zoneName;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    const getTimeZone = async () => {
      if (weatherData && weatherData.coord) {
        const { lat, lon } = weatherData.coord;
        const zone = await fetchTimeZone(lat, lon);
        setTimeZone(zone);
        setLoading(false);
      }
    };

    if (weatherData) getTimeZone();
  }, [weatherData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weatherData || !timeZone || !airQuality) return null;

  const { sunrise, sunset, main, wind, visibility } = weatherData;
  const tempMax = tempType
    ? `${Math.trunc(main.temp_max - 273.15)}°C`
    : `${Math.trunc((main.temp_max - 273.15) * 1.8 + 32)}°F`;
  const tempMin = tempType
    ? `${Math.trunc(main.temp_min - 273.15)}°C`
    : `${Math.trunc((main.temp_min - 273.15) * 1.8 + 32)}°F`;

  const isValidTime = (value) => typeof value === "number" && !isNaN(value);

  const sunriseTime = isValidTime(sunrise)
    ? DateTime.fromSeconds(sunrise)
        .setZone(timeZone)
        .toLocaleString(DateTime.TIME_SIMPLE)
    : "N/A";

  const sunsetTime = isValidTime(sunset)
    ? DateTime.fromSeconds(sunset)
        .setZone(timeZone)
        .toLocaleString(DateTime.TIME_SIMPLE)
    : "N/A";

  return (
    <div className=" 2xl:mt-0 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-5">Current Weather</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 gap-5">
      {/* Icon Box 1 */}
      <Card title="UV Index">
        <div className="flex flex-col items-center">
          <WiDaySunny className="text-yellow-400 text-6xl" />
          <span className="text-sm mt-2">{"Moderate"}</span>
        </div>
      </Card>
    
      {/* Icon Box 2 */}
      <Card title="Pressure">
        <div className="flex flex-col items-center">
          <WiBarometer className="text-blue-300 text-6xl" />
          <span className="text-sm mt-2">{main.pressure} hPa</span>
        </div>
      </Card>
    
      {/* Sunrise / Sunset */}
      <Card title="Sunrise / Sunset">
        <div className="flex justify-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <WiSunrise className="text-yellow-400 text-6xl" />
            <span className="text-sm mt-1">{sunriseTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <WiSunset className="text-yellow-400 text-6xl" />
            <span className="text-sm mt-1">{sunsetTime}</span>
          </div>
        </div>
      </Card>
    
      {/* AQI */}
      <Card>
        <Aqi aqi={airQuality.main.aqi} />
      </Card>
    
      {/* Humidity */}
      <Card title="Humidity">
        <div className="flex flex-col items-center">
          <WiHumidity className="text-blue-400 text-6xl" />
          <span className="text-sm mt-2">{main.humidity}%</span>
        </div>
      </Card>
    
      {/* Max/Min Temp */}
      <Card title="Max / Min Temp">
        <div className="flex justify-center gap-10 mb-2">
          <div className="flex flex-col items-center">
            <FaTemperatureHigh className="text-red-500 text-5xl" />
            <span className="mt-5 text-sm">{tempMax}</span>
          </div>
          <div className="flex flex-col items-center">
            <FaTemperatureLow className="text-blue-500 text-5xl" />
            <span className="mt-5 text-sm">{tempMin}</span>
          </div>
        </div>
      </Card>
    
      {/* Wind */}
      <Card title="Wind Status">
        <div className="flex flex-col items-center">
          <FaWind className="text-cyan-400 text-6xl" />
          <span className="text-sm mt-5">{wind.speed} km/h</span>
        </div>
      </Card>
    
      {/* Visibility */}
      <Card title="Visibility">
        <div className="flex flex-col items-center">
          <IoMdEye className="text-amber-400 text-6xl" />
          <span className="text-sm mt-5">{visibility / 1000} km</span>
        </div>
      </Card>
    
      {/* MAP - Full Width on Mobile, Row Span on Desktop */}
      <div className="col-span-1 sm:col-span-2 xl:col-span-4 xl:row-span-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-4 text-center dark:text-white">
          Live Weather Map
        </h2>
        <div className="w-full h-[300px] sm:h-[400px] xl:h-full">
          <Map />
        </div>
      </div>
    </div>
    
    </div>
  );
};

// Reusable Card component
const Card = ({ title, children }) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-center items-center text-center">
    {title && (
      <h2 className="text-lg text-gray-500 dark:text-white font-medium mb-3">
        {title}
      </h2>
    )}
    {children}
  </div>
);

import PropTypes from "prop-types";

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Highlights;
