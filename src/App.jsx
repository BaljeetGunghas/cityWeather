import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import Forecast from "./components/Forecast";
import Highlights from "./components/Highlights";
import SocialLinks from "./components/SocialLinks";
import { useWeather } from "./hooks/useWeather";
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const { getWeather } = useWeather();
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  const fetchCoordinates = async (place) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    return data[0];
  };

  const handleClick = async () => {
    if (input.trim().length < 3) {
      setError("Enter at least 3 characters.");
      return;
    }
    setError("");

    const coordinates = await fetchCoordinates(input);

    if (coordinates) {
      getWeather(input);
      setModalOpen(false);
    } else {
      setError("Enter a valid place");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <div className="light">
        <div className="flex flex-col lg:flex-row bg-gradient-to-br from-blue-300 via-blue-500 to-indigo-700 dark:from-gray-800 dark:via-gray-900 dark:to-black bg-[length:200%_200%] animate-rotateWeather lg:px-20 py-4 min-h-screen ">
          {/* Sidebar with Weather Info */}
          <div className="flex flex-col w-full lg:w-1/4 px-6 lg:px-3 py-6 dark:bg-gray-900 bg-white bg-opacity-40 backdrop-blur-lg rounded-t-3xl lg:rounded-r-none lg:rounded-l-3xl lg:shadow-xl">
            <div className="h-12">
              <SearchBar />
            </div>
            <div className="min-h-80 h-full">
              <Weather />
            </div>
            <div className="h-24">
              <SocialLinks />
            </div>
          </div>

          {/* Main Content */}
          <div className="dark:bg-gray-800 bg-white bg-opacity-60 backdrop-blur-2xl w-full lg:w-3/4 py-6 px-4 lg:px-10 rounded-b-3xl lg:rounded-l-none lg:rounded-r-3xl flex flex-col gap-y-8">
            <div className="h-1/3">
              <Forecast />
            </div>
            <div className="mt-0 lg:mt-16 xl:mt-10 2xl:mt-0">
              <Highlights />
            </div>
          </div>
        </div>

        {/* Modal for Location Input */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg w-full sm:w-96">
              <h2 className="text-3xl mb-2 dark:text-white">
                Enter a location:
              </h2>
              <input
                type="text"
                value={input}
                minLength={3}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="border p-2 w-full mb-2 text-xl rounded-md outline-none placeholder:text-xl"
                placeholder="Type a city..."
              />
              <button
                onClick={handleClick}
                className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg w-full"
              >
                Submit
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
