import React, { useState, useEffect } from "react";
import CitySearch from "./CitySearch";
import BaseInput from "./BaseInput";

const ShowSign = () => {
  const [formData, setFormData] = useState({
    birthdate: "",
    latitude: "",
    longitude: "",
  });

  const [signs, setSigns] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const onSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
    });
  };

  const fetchData = async () => {
    try {
      const url = `http://localhost:4000/signs?birthdate=${encodeURIComponent(
        formData.birthdate
      )}&latitude=${encodeURIComponent(
        formData.latitude
      )}&longitude=${encodeURIComponent(formData.longitude)}`;

      console.log(url);
      const response = await fetch(url);
      const data = await response.json();

      const signsArray = Array.isArray(data) ? data : [data];

      setSigns(signsArray);
      console.log("data", data);
      console.log("signs", signs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Datos ingresados:", formData);
    await fetchData();
  };

  console.log("formData", formData);
  console.log("selectedCity", selectedCity);

  return (
    <>
      <CitySearch onSelectCity={onSelectCity} />

      <div className="w-full flex flex-col gap-4">
        <div
          key="sm"
          className="flex w-full justify-center flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          <BaseInput
            type="date"
            className=""
            required
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-gradient-to-tr bg-blue text-white shadow-lg self-center p-2 rounded-2xl w-28"
          onClick={handleSubmit}
        >
          Continuar
        </button>
      </div>

      <div>
        <h2>Signo:</h2>
        <ul>
          {signs.map((sign, index) => (
            <li key={index}>{sign.signoZodiacal}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ShowSign;
