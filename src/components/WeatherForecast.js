import React, { useEffect, useState } from "react";

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const API_KEY = "45c630785375979d482c634d16fcda6a";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setForecast(data.list.filter((_, index) => index % 8 === 0)); // Every 24 hours
      } catch (error) {
        console.error("Forecast Error:", error);
      }
    };
    fetchForecast();
  }, [city]);

  return (
    <div className="forecast">
      <h2>📅 7-Day Forecast</h2>
      {forecast.map((day, index) => (
        <div key={index} className="forecast-day">
          <p>{new Date(day.dt * 1000).toDateString()}</p>
          <p>🌡️ {day.main.temp}°C</p>
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
