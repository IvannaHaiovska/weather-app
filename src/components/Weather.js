import axios from "axios";
import React, {useState, useEffect} from "react";

export default function Weather({ city }) {

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!city) return;
        setLoading(true);
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(url)
            .then((response) => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching weather data:', error);
                setLoading(false);
            })
    }, [city]);

    if(loading){
        return <p>Loading weather data...</p>
    }

    return (
        <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {Math.round(weatherData.main.temp)}°C </p>
            <p>Description: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind: {weatherData.wind.speed} km/h</p>
            <img 
                src = {`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt = {weatherData.weather[0].description}
            />
        </div>
    );
}