import React, { useState } from "react";
import CitySearch from "./CitySearch";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { useNavigate } from "react-router-dom";
import getSign from "../services/signs";
import ErrorMessage from "./ErrorMessage";
import updateUserPlanetsData from "../services/user.js";

const getValidPlanetsData = async (planetsData) => {
  try {
    if (!planetsData || !planetsData[0] || !planetsData[0].observed) {
      throw new Error("Datos de planetas inválidos");
    }

    const observed = planetsData[0].observed;

    const planetsArray = [];

    for (const planetName in observed) {
      if (observed.hasOwnProperty(planetName)) {
        const planetData = observed[planetName];

        const name = planetData.name || "NombreDesconocido";
        const zodiacSign = planetData.zodiacSign || "SignoDesconocido";

        planetsArray.push({
          name: name,
          zodiacSign: zodiacSign,
        });
      }
    }

    return planetsArray;
  } catch (error) {
    console.error("Error al procesar datos de planetas:", error);
    throw error;
  }
};

const SearchUserSign = ({ newUserId }) => {
  const [formData, setFormData] = useState({
    birthdate: "",
    latitude: "",
    longitude: "",
  });

  const [userPlanetsData, setUserPlanetsData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const onSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      latitude: selectedCity ? selectedCity.latitude : "",
      longitude: selectedCity ? selectedCity.longitude : "",
    });
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    try {
      const planetsData = await getSign(formData);
      setUserPlanetsData(planetsData);
      if (planetsData) {
        const validPlanetData = await getValidPlanetsData(planetsData);

        updateUserPlanetsData(newUserId,validPlanetData);
        navigate(`/user-home/${newUserId}`);
      } else {
        setErrorMessage("Algo salió mal, vuelve a intentarlo");
      }
    } catch (error) {
      console.error("Error al obtener el signo:", error);
    }
  };

  return (
    <div className="min-h-screen my-16">
      <CitySearch onSelectCity={onSelectCity} />

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col mb-6 mx-1" style={{ width: "120%" }}>
            <label className="p-1" htmlFor="date">
              Fecha de nacimiento
            </label>
            <BaseInput
              id="date"
              required
              type={isEditing ? "text" : "date"}
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ width: "100%" }}
            />
          </div>
          <div className="flex flex-col mb-6" style={{ width: "120%" }}>
            <label className="p-1" htmlFor="time">
              Hora de nacimiento
            </label>
            <BaseInput
              id="time"
              required
              type="time"
              name="time"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

        <div className="flex flex-row justify-center items-center">
          <BaseButton
            btnText="Crear cuenta"
            className=" bg-blue text-white shadow-lg self-center rounded-2xl"
            onClick={handleSubmit}
          ></BaseButton>
        </div>
      </div>
      <div>
        <ul>
          {userPlanetsData &&
            userPlanetsData.map((planet, index) => (
              <div>
                <li key={index}>{planet.zodiacSign}</li>
                <li key={index}>{planet.name}</li>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchUserSign;
