import React, { useState, useEffect } from "react";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  // Check if browser supports Speech Recognition
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
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setTranscript(speechText);
      console.log("Recognized text: ", speechText);
    };

    recognition.onend = () => {
      console.log("Voice recognition stopped.");
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error: ", event.error);
      setError(event.error);
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
      <h3>🎙 Voice Assistant</h3>
      {error && <p style={{ color: "red" }}>⚠ {error}</p>}
      <button onClick={handleStartListening} disabled={isListening}>
        {isListening ? "🎤 Listening..." : "🎙 Start Listening"}
      </button>
      <button onClick={handleStopListening} disabled={!isListening}>
        ⏹ Stop
      </button>
      <p>🗣 Recognized Text: {transcript || "No speech detected yet"}</p>
    </div>
  );
};

export default VoiceAssistant;
