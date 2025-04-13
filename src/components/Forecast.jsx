import React, { useState } from "react";
import { useWeather } from "../hooks/useWeather";
import { DateTime } from "luxon";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
const Forecast = () => {
  const { fiveDayForecast, tempType, setTempType } = useWeather();
  const [formatType, setFormatType] = useState(true);
  const { darkMode } = useDarkMode();
  const twentyFourForecast = fiveDayForecast
    .slice(0, 9)
    .filter((data, index) => index % 2 === 0);
  const totalForecast = fiveDayForecast.filter(
    (data, index) => index % 8 === 0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl lg:text-3xl w-2/6 lg:w-1/6 font-semibold">
          Forecast
        </h1>
        <div className="flex justify-start w-3/6 lg:w-4/6 text-base lg:text-xl gap-2 lg:gap-4">
          <button
            onClick={() => setFormatType(true)}
            className={`${
              formatType
                ? `${
                    darkMode ? "text-white underline" : "text-black underline"
                  } font-semibold`
                : `${darkMode ? "text-gray-500" : "text-gray-400"}`
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setFormatType(false)}
            className={`${
              !formatType
                ? `${
                    darkMode ? "text-white underline" : "text-black underline"
                  } font-semibold`
                : `${darkMode ? "text-gray-500" : "text-gray-400"}`
            }`}
          >
            5 Days
          </button>
        </div>
        <div className="w-1/6 flex justify-end gap-4 text-base lg:text-xl items-center font-semibold ">
          <p
            onClick={() => setTempType(true)}
            className={`${
              tempType
                ? `${
                    darkMode ? "bg-gray-900 text-white" : "bg-black text-white"
                  }`
                : `${darkMode ? "bg-gray-200 text-black" : "bg-white"}`
            } h-10 rounded-full px-3 py-2 hover:cursor-pointer`}
          >
            °C
          </p>
          <p
            onClick={() => setTempType(false)}
            className={`${
              !tempType
                ? `${
                    darkMode ? "bg-gray-900 text-white" : "bg-black text-white"
                  }`
                : `${darkMode ? "bg-gray-200 text-black" : "bg-white"}`
            } h-10 rounded-full px-3.5 py-2 hover:cursor-pointer`}
          >
            °F
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {(formatType ? twentyFourForecast : totalForecast).map((day, index) => {
          const timestamp = day.dt;
          const dateTime = DateTime.fromSeconds(timestamp);
          const formattedDate = dateTime.toFormat("dd MMMM");
          const formattedTime = dateTime.toFormat("hh:mm a");
          const dayOfWeek = dateTime.toFormat("cccc");
          const tempCel = Math.trunc(day.main.temp - 273.15);
          const tempFah = Math.trunc((day.main.temp - 273.15) * 1.8 + 32);
          const humidity = day.main.humidity;
          const wind = day.wind.speed.toFixed(1);
          const desc = day.weather[0].description;

          return (
            <div
              key={index}
              className="flex group flex-col bg-white dark:bg-slate-900 p-2 rounded-2xl lg:max-w-[174px] w-full text-base justify-center items-center shadow-lg hover:shadow-2xl"
            >
              <div>
                <p>
                  {formatType ? (
                    <>
                      {formattedDate}
                      {", "}
                      {formattedTime}
                    </>
                  ) : (
                    dayOfWeek
                  )}
                </p>
              </div>
              <div className="flex items-center text-3xl">
                <p className="mt-2">
                  {tempType ? `${tempCel}°C` : `${tempFah}°F`}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-16"
                />
              </div>
              <p className="group-hover:hidden">{day.weather[0].description}</p>
              <div className="hidden group-hover:flex gap-x-4">
                {formatType ? (
                  <p className="flex">
                    <WiHumidity className="text-xl text-blue-500" /> {humidity}%{" "}
                  </p>
                ) : (
                  <div>
                    {tempType ? (
                      <>
                        <span className="flex">{desc}</span>
                      </>
                    ) : (
                      <>
                        <span className="flex">{desc}</span>
                      </>
                    )}
                  </div>
                )}
                {formatType ? (
                  <p className="flex gap-x-1 ">
                    <FaWind className="text-blue-300" /> {wind}km/h
                  </p>
                ) : null}
              </div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
