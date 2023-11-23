import React, { useState } from "react";
import BaseInput from "./BaseInput";

const CitySearch = ({onSelectCity}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          value
        )}&key=5defbe14934349baa8cc1a4dddb50324`
      );

      const data = await response.json();

      if (data.results) {
        const locations = data.results.map((result) => ({
          name: result.formatted,
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
        }));

        setResults(locations);
      } else {
        console.error("No results found.");
      }
    } catch (error) {
      console.error("Error searching for cities:", error);
    }
  };


  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setQuery(city.name);
    setIsOpen(false);
    onSelectCity(city);
  };

  return (
    <div>
      <div
        key="sm"
        className="flex w-full justify-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
      >
        <BaseInput
          required
          className="w-1/2"
          type="search"
          value={query}
          onChange={handleChange}
        />
      </div>
      {isOpen && (
        <ul className="rounded-md ">
          {results.map((location) => (
            <li
              className="bg-gray-400 text-black p-2 mx-2 hover:cursor-pointer hover:bg-gray-300"
              key={location.name}
              onClick={() => handleSelectCity(location)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
