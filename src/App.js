import React, {useState, useEffect} from "react";
import Search from "./components/Search";
import Weather from "./components/Weather";

function App() {
  const [city, setCity] = useState("Paris");

  return (
    <div>
      <h1>Weather App</h1>
      <Search setCity={setCity} />
      <Weather city={city} />
    </div>
  );
}

export default App;