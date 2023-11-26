import React, { useState } from "react";
import CitySearch from "./CitySearch";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { useNavigate } from "react-router-dom";
import getSign from "../services/signs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import ErrorMessage from "./ErrorMessage";

const SearchUserSign = ({ newUserId }) => {
  const [formData, setFormData] = useState({
    birthdate: "",
    latitude: "",
    longitude: "",
  });

  const [userPlanetsData, setUserPlanetsData] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const onSelectCity = (city) => {
    setSelectedCity(city);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      latitude: selectedCity ? selectedCity.latitude : "",
      longitude: selectedCity ? selectedCity.longitude : "",
    });
  };

  const handleSubmit = async () => {
    try {
      const planetsData = await getSign(formData);
      setUserPlanetsData(planetsData);
      if (planetsData) {
        addUserPlanetsData(planetsData);
        navigate(`/user-home/${newUserId}`);
      } else {
        setErrorMessage("Algo salió mal volvé a intentarlo");
      }
    } catch (error) {
      console.error("Error al obtener el signo:", error);
    }
  };

  const addUserPlanetsData = async (planetsData) => {
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

      const userRef = doc(db, "users", newUserId);
      await updateDoc(userRef, {
        planetsData: planetsArray,
      });
    } catch (error) {
      console.error("Error al agregar datos de planetas al usuario:", error);
    }
  };

  return (
    <div className="min-h-screen my-20">
      <CitySearch onSelectCity={onSelectCity} />

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col mb-6">
          <label className="p-1" htmlFor="date">
            Fecha de nacimiento
          </label>
          <BaseInput
            id="date"
            required
            type="date"
            name="date"
            value={formData.birthdate}
            onChange={handleChange}
            style={{
              appearance: 'none', 
              fontSize: '1rem',
              padding: '0.375rem 0.75rem',
              border: '1px solid #a0aec0', // Puedes ajustar el color del borde según tus necesidades
              borderRadius: '0.25rem',
            }}            />
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
