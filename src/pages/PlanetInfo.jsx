import arrowBack from "../assets/btn-back.svg";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UpperUserNavComponent from "../components/UpperUserNav";
import LowerUserNav from "../components/LowerUserNav";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import marsImage from "../assets/planets/mars.png";
import mercuryImage from "../assets/planets/mercury.png";
import moonImage from "../assets/planets/moon.png";
import sunImage from "../assets/planets/sun.png";
import GeneralLoader from "../components/GeneralLoader";

// Mapeo de nombres de planetas a rutas de imagen
const planetImageMap = {
  mars: marsImage,
  mercury: mercuryImage,
  moon: moonImage,
  sun: sunImage,
};

const spanishPlanetNames = {
  mars: "Marte",
  mercury: "Mercurio",
  moon: "Luna",
  sun: "Sol",
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const GetUserData = async (userId) => {
  const userRef = doc(db, "users", userId);
  try {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const userPlanetsData = userData.planetsData;
      const planetsData = [];

      userPlanetsData.forEach((planet) => {
        const name = planet.name;
        const sign = planet.zodiacSign;
        planetsData.push({
          name: name,
          sign: sign,
        });
      });
      return planetsData;
    } else {
      console.log("No se encontraron datos para el usuario con ID:", userId);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error;
  }
};

export default function PlanetInfo() {
  const [planetInfo, setPlanetInfo] = useState(null);
  const [planetsWithImages, setPlanetsWithImages] = useState([]);
  const { planetName, userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const planetsData = await GetUserData(userId);

      const selectedPlanetInfo = planetsData.find(
        (planet) => planet.name === planetName
      );
      setPlanetInfo(selectedPlanetInfo);

      const planetsWithImages = planetsData.map((planet) => {
        return {
          name: planet.name,
          image: planetImageMap[planet.name],
          sign: planet.sign,
        };
      });

      setPlanetsWithImages(planetsWithImages);
    };

    fetchData();
  }, [userId, planetName]);

  const goBack = () => {
    navigate(`/user-home/${userId}`);
  };

  return (
    <>
      <UpperUserNavComponent />

      <div className="flex items-center justify-between h-full p-3">
        <div>
          <button onClick={goBack} className="self-start">
            <img src={arrowBack} alt="Back" className="px-1" />
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {planetsWithImages.length > 0 && (
          <img
            src={
              planetsWithImages.find((planet) => planet.name === planetName)
                ?.image || ""
            }
            alt={planetName}
          />
        )}
      </div>
      <div className="bg-darkGrey p-3 pb-16 my-4 rounded-tl-3xl rounded-tr-3xl max-h-screen tracking-wide">
        {planetInfo ? (
          <h3 className="text-2xl text-center p-3">
            {planetInfo &&
              planetInfo.name &&
              capitalizeFirstLetter(spanishPlanetNames[planetInfo.name])}{" "}
            - {planetInfo && planetInfo.sign}
          </h3>
        ) : (
          <GeneralLoader className="p-4 text-center" size="xl"/>
        )}
        <p className="p-2">
          El sol revela la cualidad básica de nuestra consciencia, es el factor
          central de nuestra personalidad, del mismo modo como el Sol es el
          centro de nuestra galaxia.
        </p>
        <br />
        <p className="p-2">
          El elemento solar para este signo muestra el estado de conciencia y
          aquello que le motiva, fortalece y lo que le apasiona. El Sol en
          Géminis destaca su mente rápida, razonamientos lógicos y su interés
          por la comunicación. Para ellos la relación con otras personas es
          esencial, domina la oratoria, mantener una conversación interesante y
          viva.
        </p>
      </div>
      <LowerUserNav />
    </>
  );
}
