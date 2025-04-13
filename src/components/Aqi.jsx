import React from "react";

const Aqi = ({ aqi }) => {
  const percentage = ((aqi ) / 5) * 100;

  // Define colors based on AQI value
  const getColorAndLabel = (value) => {
    if (value <= 1) return { color: "#5BE12C", label: "Good", emoji: "😄" };
    if (value <= 2) return { color: "#F5CD19", label: "Fair", emoji: "😊" };
    if (value <= 3) return { color: "#FF9800", label: "Moderate", emoji: "😑" };
    if (value <= 4) return { color: "#EA4228", label: "Poor", emoji: "😷" };
    return { color: "#8E44AD", label: "Very Poor", emoji: "😨" };
  };

  const { color, label, emoji } = getColorAndLabel(aqi);

  return (
    <div className="flex flex-col gap-y-1.5">
      <div className="text-lg text-gray-500 dark:text-white font-normal text-center">
        Air Quality
      </div>
      <h1 className="text-center text-2xl">
        AQI: {aqi} <span className="text-sm text-gray-400 dark:text-white">(Range 1-5)</span>
      </h1>
      <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
        <div className="mx-auto"
          style={{
            width: "90%",
            height: "12px",
            backgroundColor: "#e0e0e0",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${percentage}%`,
              backgroundColor: color,
              borderRadius: "10px",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-2.5">
        <h1 className="text-2xl text-center">{label}</h1>
        <p className="text-xl">{emoji}</p>
      </div>
    </div>
  );
};

export default Aqi;
