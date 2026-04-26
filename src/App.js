import React, {useState} from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import "./styles/App.css";

function App() {
  const [city, setCity] = useState("Paris");

  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCity(`${lat},${lon}`);
      },
      () => {
        alert("Unable to get your location");
      }
    );
  }

  return (
    <div>
      <h1>Weather App</h1>
      <Search setCity={setCity} />
      <Weather city={city} />
      <div style={{ textAlign: "center" }}>
        <button onClick={handleLocation}>Use my location</button>
      </div>
    </div>
  );
}

export default App;