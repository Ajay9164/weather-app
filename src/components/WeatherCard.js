import React from "react";

const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (iconCode) =>
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <div className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <img src={getWeatherIcon(weather.weather[0].icon)} alt="Weather Icon" />
      <p>🌡 Temperature: {weather.main.temp}°C</p>
      <p>☁ Weather: {weather.weather[0].description}</p>
      <p>💧 Humidity: {weather.main.humidity}%</p>
      <p>🌬 Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCard;
