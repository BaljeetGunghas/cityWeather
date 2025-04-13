import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import { useWeather } from "../hooks/useWeather";

const SearchBar = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [place, setPlace] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { getWeather } = useWeather();

  const fetchCoordinates = async (place) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    return data[0];
  };

  const handleClick = async () => {
    if (place.trim().length < 3) {
      setErrorMessage("Enter at least 3 characters.");
      return;
    }
    setErrorMessage("");

    const coordinates = await fetchCoordinates(place);

    if (coordinates) {
      getWeather(place);
      setPlace("");
    } else {
      setErrorMessage("Enter a valid place.");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather({ lat: latitude, lon: longitude });
        },
        (error) => {
          let localErrorMessage = "An unknown error occurred.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              localErrorMessage = "Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              localErrorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              localErrorMessage = "Location request timed out.";
              break;
            default:
              localErrorMessage =
                "An error occurred while fetching the location.";
              break;
          }
          setErrorMessage(localErrorMessage);
        },
        { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setErrorMessage("Geolocation is not supported by your browser.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto">
      <div className="flex items-center gap-1">
        <input
          className="w-full rounded-lg px-3 py-1 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-md dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Search for places..."
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button
          onClick={handleClick}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
        >
          <FaMagnifyingGlass className="text-sm" />
        </button>
        <button
          onClick={handleLocationClick}
          className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition duration-300"
        >
          <MdMyLocation className="text-sm" />
        </button>
      </div>

      {errorMessage && (
        <div className="bg-red-200 text-red-800 px-4 py-2 mt-3 rounded-md border border-red-300 leading-5 shadow-lg transition duration-300">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
