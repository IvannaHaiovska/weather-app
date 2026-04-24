import axios from "axios";
import React, {useState, useEffect} from "react";

export default function Weather({ city }) {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!city) return;
        setLoading(true);
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        let url;

        if (city.includes(",")) {
            const [lat, lon] = city.split(",");
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        } else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        }

        axios.get(url)
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

    if(loading){
        return <p className = "loader"></p>
    }
    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="weather-card">
            <h2>
                {city.includes(",") ? "Your location" : weatherData.name}
            </h2>
            <p>Temperature: {Math.round(weatherData.main.temp)}°C </p>
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