import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";

const VoiceCommand = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  let recognition = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      console.log("Voice recognition started...");
      setError("");
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      console.log("Recognized text:", speechText);
      dispatch(fetchWeather(speechText)); // Fetch weather based on speech input
    };

    recognition.onend = () => {
      console.log("Voice recognition stopped.");
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setError("Error: " + event.error);
      setIsListening(false);
    };
  } else {
    console.warn("Speech Recognition is not supported in this browser.");
    setError("Speech Recognition is not supported in this browser.");
  }

  const handleStartListening = () => {
    if (!recognition) {
      setError("Speech Recognition is not supported in this browser.");
      return;
    }
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const handleStopListening = () => {
    if (isListening && recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div>
      <h3>🎙 Voice Command</h3>
      {error && <p style={{ color: "red" }}>⚠ {error}</p>}
      <button onClick={handleStartListening} disabled={isListening}>
        {isListening ? "🎤 Listening..." : "🎙 Start Listening"}
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        ⏹ Stop
      </button>
      <p>🗣 Speak the city name to get weather</p>
    </div>
  );
};

export default VoiceCommand;
