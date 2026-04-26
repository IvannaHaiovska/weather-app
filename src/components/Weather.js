import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setWeatherData(null);

    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let url;

    if (city.includes(",")) {
      const [lat, lon] = city.split(",");
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    }

    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("City not found. Please try again.");
        } else {
          setError("Something went wrong");
        }
        setLoading(false);
      });
  }, [city]);

  function getWeatherClass(description) {
    if (description.includes("cloud")) return "cloudy";
    if (description.includes("rain")) return "rainy";
    if (description.includes("clear")) return "sunny";
    if (description.includes("snow")) return "snowy";
    return "default";
  }

  useEffect(() => {
    if (weatherData) {
      const description = weatherData.weather[0].description.toLowerCase();
      const className = getWeatherClass(description);

      document.body.classList.remove("sunny", "cloudy", "rainy", "snowy", "default");
      document.body.classList.add(className);
    }
  }, [weatherData]);

  if (loading) {
    return <div className="loader"></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div
      className={`weather-card ${getWeatherClass(
        weatherData.weather[0].description.toLowerCase()
      )}`}
    >
      <h2>
        📍 {city.includes(",") ? "Your location" : weatherData.name}
      </h2>

      <p> {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
        })}</p>

      <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
      <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>

      <p style={{ textTransform: "capitalize" }}>
        Description: {weatherData.weather[0].description}
      </p>

      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind: {weatherData.wind.speed} km/h</p>

      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
        alt={weatherData.weather[0].description}
      />
    </div>
  );
}