import React, { useState } from "react";
import BaseInput from "./BaseInput";
import getCities from "../services/cities";
import ErrorMessage from "./ErrorMessage";

const CitySearch = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

  console.log("selectedCity", selectedCity);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    selectingCities();
  };

  const selectingCities = async () => {
    try {
      if (query.length > 0) {
        const foundCities = await getCities(query);
        setResults(foundCities);

        setIsOpen(true);
      }
    } catch (error) {
      setErrorMessage('Algo salió mal volvé a interlo')
s    }
  };

  const searchCities = async () => {
    try {
      if (
        selectedCity &&
        selectedCity.latitude !== undefined &&
        selectedCity.longitude !== undefined
      ) {
        const foundCities = await getCities(
          selectedCity.latitude,
          selectedCity.longitude,
          query
        );
        console.log("foundCities: ", foundCities);
        setResults(foundCities);
      } else {
        console.warn(
          "Latitude or longitude is undefined. Skipping city search."
        );
        setResults([]); 
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
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col mb-6">
          <label className="p-1" htmlFor="search">
            Lugar de nacimiento
          </label>
          <BaseInput
            id="search"
            required
            type="search"
            name="search"
            value={query}
            onChange={handleChange}
          />
        </div>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      </div>
      {isOpen && (
        <ul className="rounded-md bg-gray-200">
          {results.map((location) => (
            <li
              className=" text-black p-2 mx-2 hover:cursor-pointer hover:bg-gray-300"
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
