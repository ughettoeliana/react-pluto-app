import React, { useState } from "react";
import CitySearch from "./CitySearch";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { useNavigate } from "react-router-dom";
import getSign from "../services/signs";

const SearchUserSign = () => {
  const [formData, setFormData] = useState({
    birthdate: "",
    latitude: "",
    longitude: "",
  });

  const [signs, setSigns] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const onSelectCity = (city) => {
    setSelectedCity(city);
    console.log("onSelectCity", city);
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
    console.log("Datos ingresados:", formData);
    try {
      const sign = await getSign(formData);
      setSigns(sign);
      if (sign) {
        navigate("/user-home");
      }else {
        console.log('hubo un error')
      }
    } catch (error) {
      console.error("Error al obtener el signo:", error);
    }
  };


  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen">
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
        <div className="flex flex-row justify-around items-center">
          <BaseButton
            btnText="Volver"
            className=" bg-slate-500 text-white shadow-lg self-center rounded-2xl"
            onClick={goBack}
          ></BaseButton>
          <BaseButton
            btnText="Crear cuenta"
            className=" bg-blue text-white shadow-lg self-center rounded-2xl"
            onClick={handleSubmit}
          ></BaseButton>
        </div>
      </div>
      <div>
        <h2>Signo:</h2>
        <ul>
          {signs &&
            signs.map((sign, index) => (
              <li key={index}>{sign.signoZodiacal}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchUserSign;
