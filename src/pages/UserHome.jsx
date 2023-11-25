import React, { useState } from "react";
import carta from "../assets/carta.png";
import mars from "../assets/planets/mars.png";
import mercury from "../assets/planets/mercury.png";
import moon from "../assets/planets/moon.png";
import sun from "../assets/planets/sun.png";
import arrow from "../assets/arrow-right.svg";
import { Link, useParams, useNavigate } from "react-router-dom";
import LowerUserNavComponent from "../components/LowerUserNav";
import UpperUserNavComponent from "../components/UpperUserNav";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const GetUserData = async (userId) => {
  
  const userRef = doc(db, "users", userId);
  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      console.log("Datos del usuario:", userData);
      const userSign = userData.sign[0].signoZodiacal;
      return userSign;
    } else {
      console.log("No se encontraron datos para el usuario con ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error;
  }
};

function UserHome() {
  const [userSign, setUserSign] = useState();
  const navigate = useNavigate();
  const {userId} = useParams();

  const planets = [
    { name: "Sun", imgSrc: sun },
    { name: "Mars", imgSrc: mars },
    { name: "Mercury", imgSrc: mercury },
    { name: "Moon", imgSrc: moon },
  ];

  const handlePlanetClick = async (planetName) => {
    const userSign = await GetUserData(userId);
    console.log('userSign', userSign)
    setUserSign(userSign)
    console.log('userSign', userSign)
    navigate(`/planet-info/${planetName}/${userSign}`);
  };

  return (
    <>
      <UpperUserNavComponent />
      <div className="flex flex-col justify-center px-3">
        <h2 className="my-2">PLUTO es tu guía personal hacia el futuro</h2>
        <div className="self-center my-4">
          <img
            src={carta}
            alt="Representacion grafica (Carta Natal) de la posisiones de los signos"
          />
        </div>
        <div className="flex flex-row justify-around items-center py-3 my-4">
          {planets.map((planet) => (
            <Link
              key={planet.name}
              to={`/planet-info/${planet.name.toLowerCase()}/${userSign}`}
              onClick={() => handlePlanetClick(planet.name.toLowerCase())}
            >
              <img src={planet.imgSrc} alt={planet.name} />
              <h3 className="text-center">{planet.name}</h3>
            </Link>
          ))}
        </div>
        <div className="my-4">
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to="/cicles">CICLOS </Link>
            <img src={arrow} alt="arrow icon" />
          </div>
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to="/cicles">CICLOS </Link>
            <img src={arrow} alt="arrow icon" />
          </div>
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to="/cicles">CICLOS </Link>
            <img src={arrow} alt="arrow icon" />
          </div>
        </div>
      </div>
      <LowerUserNavComponent />
    </>
  );
}

export default UserHome;
