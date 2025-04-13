import { useWeather } from "../hooks/useWeather";
import { DateTime } from "luxon";

const Weather = () => {
  const { weatherData, tempType } = useWeather();

  if (!weatherData) return <div className="text-center mt-20 text-lg">Loading Weather Data...</div>;

  const { main, weather, sys, clouds, dt, name, wind } = weatherData;
  const { temp, feels_like, humidity } = main;
  const timestamp = dt;

  const dateTime = DateTime.fromSeconds(timestamp);
  const formattedDate = dateTime.toFormat("dd MMMM yyyy");
  const formattedTime = dateTime.toFormat("hh:mm a");
  const day = dateTime.toFormat("cccc");
  const hour = dateTime.hour;

  const weatherIcon = weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`;

  const tempCel = Math.trunc(temp - 273.15);
  const tempFah = Math.trunc((temp - 273.15) * 1.8 + 32);

  const tempFeelCel = Math.trunc(feels_like - 273.15);
  const tempFeelFah = Math.trunc((feels_like - 273.15) * 1.8 + 32);

  const getTemp = () => (tempType ? `${tempCel}°C` : `${tempFah}°F`);
  const getTempFeel = () => (tempType ? `${tempFeelCel}°C` : `${tempFeelFah}°F`);

  const greeting =
    hour < 12 ? "Good Morning ☀️" :
    hour < 18 ? "Good Afternoon 🌤️" :
    "Good Evening 🌙";

  const tip = [
    "Stay hydrated and wear sunscreen! 🧴",
    "A perfect day for a walk 🚶‍♂️",
    "Don’t forget your umbrella if you’re heading out! ☔",
    "Check the sky tonight — it might be a stargazing night 🌌",
    "Keep an eye on the wind chill today 🌬️",
  ];
  const randomTip = tip[Math.floor(Math.random() * tip.length)];

  return (
    <div className="flex flex-col items-center text-center p-6 px-0 animate-fadeIn max-w-xl mx-auto">
      <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-300 mb-4">{greeting}</h2>

      <div className="rounded-2xl w-full space-y-6">
        <div className="flex flex-col items-center">
          <img
            src={iconUrl}
            alt={weatherIcon.description}
            className="w-32 h-32 mb-2 animate-fadeInScale"
          />
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">{getTemp()}</h1>
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Feels Like: {getTempFeel()}
          </p>
          <p className="text-sm italic text-indigo-500 dark:text-indigo-300 mt-2">“{randomTip}”</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300 text-sm md:text-base">
          <div className="flex flex-col">
            <span className="font-semibold">Condition:</span>
            <span className="capitalize">{weatherIcon.description}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Clouds:</span>
            <span>{clouds.all}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Humidity:</span>
            <span>{humidity}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Wind:</span>
            <span>{wind?.speed} m/s</span>
          </div>
        </div>

        <div className="text-gray-700 dark:text-gray-300 text-sm md:text-base mt-4">
          <p>{name || "Unknown Location"}, {sys?.country || "??"}</p>
          <p>{day}, {formattedTime}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
