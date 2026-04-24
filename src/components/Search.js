import React, {
    useState
} from "react";

export default function Search({ setCity }) {
  const [input, setInput] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (!input.trim()) return;

    setCity(input);
    setInput("");
  }
  
  return (
    <form onSubmit={handleSearch}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter city"
      />
      <button>Search</button>
    </form>
  );
}