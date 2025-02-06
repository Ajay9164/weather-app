import React, { useState } from "react";

const WeatherChatbot = ({ weather }) => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = () => {
    if (question.includes("cold") || question.includes("hot")) {
      setResponse(
        `It's currently ${weather.main.temp}°C. Wear a ${weather.main.temp > 25 ? "T-shirt" : "jacket"}!`
      );
    } else if (question.includes("humidity")) {
      setResponse(`Humidity is ${weather.main.humidity}%. Stay hydrated!`);
    } else {
      setResponse("I can only answer weather-related questions.");
    }
  };

  return (
    <div className="chatbot">
      <h3>💬 AI Weather Chatbot</h3>
      <input
        type="text"
        placeholder="Ask about weather..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleChat}>Ask</button>
      {response && <p>🤖 {response}</p>}
    </div>
  );
};

export default WeatherChatbot;
