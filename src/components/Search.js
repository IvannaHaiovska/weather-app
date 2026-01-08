import React, {
    useState
} from "react";

export default function Search(props) {
    const [city, setCity] = useState("");

    function handleSearch(event) {
        event.preventDefault(); 
        alert(`Searching weather for ${city}`);
    }

    function updateCity(event) {
        setCity(event.target.value);
    }

    return ( 
        <form onSubmit = {handleSearch}>
            <input type = "text" placeholder = "Enter city" value = {city}
            onChange = {updateCity}/> 
            <button type = "submit"> Search </button> 
        </form>
    );
}