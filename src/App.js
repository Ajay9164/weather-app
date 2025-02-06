import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import WeatherChatbot from "./components/WeatherChatbot";
import VoiceCommand from "./components/VoiceCommand";
import VoiceAssistant from "./components/VoiceAssistant"; // New AI Voice Assistant
import ToggleDarkMode from "./components/ToggleDarkMode"; 
import { sendWeatherNotification } from "./utils/notifications";
import "./styles/global.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "45c630785375979d482c634d16fcda6a";

  // 🌍 Auto-Detect User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    });
  }, []);

  // 📍 Fetch Weather by Coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        sendWeatherNotification(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // 🔍 Fetch Weather by City Name
  const fetchWeather = async (searchCity) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        sendWeatherNotification(data);
      } else {
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="app-container">
      <ToggleDarkMode /> {/* 🌑 Dark Mode Toggle */}
      <h1>🌍 AI-Powered Weather App</h1>

      {/* 🔎 Search Input & Button */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Enter city..." 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button onClick={() => fetchWeather(city)}>Get Weather</button>
      </div>

      {/* 📊 Weather Data */}
      {weather && <WeatherCard weather={weather} />}
      {weather && <WeatherForecast city={city} />}
      {weather && <WeatherChatbot weather={weather} />}
      {weather && <VoiceAssistant weather={weather} />} {/* 🗣 AI Voice Assistant */}

      {/* 🎤 Voice Command Feature */}
      <VoiceCommand fetchWeather={fetchWeather} />
    </div>
  );
};

export default App;
