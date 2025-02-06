export const sendWeatherNotification = (weather) => {
    if (Notification.permission === "granted") {
      new Notification("Weather Alert", {
        body: `Current temp: ${weather.main.temp}°C - ${weather.weather[0].description}`,
      });
    } else {
      Notification.requestPermission();
    }
  };
  