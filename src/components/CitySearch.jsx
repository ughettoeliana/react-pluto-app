import React, { useState } from "react";
import BaseInput from "./BaseInput";
import getCities from "../services/cities";

const CitySearch = ({ onSelectCity }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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
   
         // Abrir el componente de búsqueda cuando se comienza a escribir
         setIsOpen(true);
       }
    } catch (error) {
       console.error("Error searching for cities:", error);
    }
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
        setResults([]); // Puedes limpiar los resultados si no hay ciudad seleccionada
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
          name="search"
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
