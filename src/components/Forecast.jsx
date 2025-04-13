import { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { DateTime } from "luxon";
import { WiHumidity, WiStrongWind, WiDaySunny, WiCloudy } from "react-icons/wi";

const Forecast = () => {
  const { fiveDayForecast, tempType, setTempType } = useWeather();
  const [formatType, setFormatType] = useState(true);

  const twentyFourForecast = fiveDayForecast
    .slice(0, 9)
    .filter((_, index) => index % 2 === 0);
  const totalForecast = fiveDayForecast.filter((_, index) => index % 8 === 0);

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear"))
      return <WiDaySunny className="text-yellow-400 text-5xl" />;
    if (desc.includes("cloud"))
      return <WiCloudy className="text-gray-500 text-5xl" />;
    // Add more mappings as needed
    return <WiDaySunny className="text-blue-400 text-5xl" />;
  };

  const convertTemp = (kelvinTemp) => {
    return tempType
      ? `${Math.round(kelvinTemp - 273.15)}°C` // Convert Kelvin to Celsius
      : `${Math.round((kelvinTemp - 273.15) * 1.8 + 32)}°F`; // Convert Kelvin to Fahrenheit
  };

  return (
    <div>
      <div className="flex justify-between items-center  text-black dark:text-white">
        <h1 className="text-2xl lg:text-3xl font-bold">Forecast</h1>

        <div className="flex items-center gap-4 text-sm lg:text-base">
          <button
            onClick={() => setFormatType(true)}
            className={`${
              formatType
                ? "underline font-semibold"
                : "text-gray-500 dark:text-gray-500"
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setFormatType(false)}
            className={`${
              !formatType
                ? "underline font-semibold"
                : "text-gray-500 dark:text-gray-500"
            }`}
          >
            5 Days
          </button>
        </div>

        <div className="flex gap-3 text-sm lg:text-base">
          <p
            onClick={() => setTempType(true)}
            className={`h-8 w-8 grid place-items-center text-sm rounded-full cursor-pointer ${
              tempType
                ? "bg-black text-white dark:bg-white dark:text-black "
                : "bg-gray-100 text-black dark:bg-black dark:text-white"
            } `}
          >
            °C
          </p>
          <p
            onClick={() => setTempType(false)}
            className={`h-8 w-8 grid place-items-center rounded-full cursor-pointer ${
              !tempType
                ? "bg-black text-white dark:bg-white dark:text-black "
                : "bg-gray-100 text-black dark:bg-black dark:text-white"
            } `}
          >
            °F
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3 mt-5">
        {(formatType ? twentyFourForecast : totalForecast).map((day, index) => {
          const dt = DateTime.fromSeconds(day.dt);
          const dateLabel = formatType
            ? `${dt.toFormat("dd MMM")}, ${dt.toFormat("hh:mm a")}`
            : dt.toFormat("cccc");

          const temp = convertTemp(day.main.temp); // Convert the temperature using the helper function

          return (
            <div
              key={index}
              className="bg-white text-black dark:text-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition transform hover:scale-105 rounded-2xl p-4 flex flex-col items-center w-full sm:w-[45%] md:w-[30%] lg:w-[154px]"
            >
              <p className="text-sm text-center mb-1">{dateLabel}</p>
              <div className="flex items-center justify-center text-3xl mb-2">
                <span>{temp}</span>
              </div>
              <div className="mb-2">
                {getWeatherIcon(day.weather[0].description)}
              </div>
              <p className="text-sm capitalize text-center dark:text-white text-gray-600 group-hover:hidden">
                {day.weather[0].description}
              </p>
              <div className="hidden group-hover:flex flex-col text-xs gap-y-1 text-gray-500">
                <p className="flex items-center gap-1">
                  <WiHumidity className="text-blue-400 text-lg" />{" "}
                  {day.main.humidity}%
                </p>
                <p className="flex items-center gap-1">
                  <WiStrongWind className="text-blue-300 dark:text-white text-lg" />{" "}
                  {day.wind.speed.toFixed(1)} km/h
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
