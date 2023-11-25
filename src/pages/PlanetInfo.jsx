import arrowBack from "../assets/btn-back.svg";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UpperUserNavComponent from "../components/UpperUserNav"; 
import LowerUserNav from "../components/LowerUserNav"; 


// Mapeo de nombres de planetas a rutas de imagen
const planetImageMap = {
  mars: import("../assets/planets/mars.png"),
  mercury: import("../assets/planets/mercury.png"),
  moon: import("../assets/planets/moon.png"),
  sun: import("../assets/planets/sun.png"),
};

export default function PlanetInfo() {
  const { planetName } = useParams();
  const [imgSrc, setImgSrc] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const loadImgSrc = async () => {
      try {
        // Usamos Promise.all para esperar que todas las importaciones se completen
        const [module] = await Promise.all([
          planetImageMap[planetName.toLowerCase()],
        ]);
        setImgSrc(module.default);
      } catch (error) {
        // Manejar el error, por ejemplo, cargar una imagen predeterminada
        console.error("Error cargando la imagen:", error);
        setImgSrc(require("../assets/planets/default.png").default);
      }
    };

    loadImgSrc();
  }, [planetName]);

  console.log("planetName", planetName);

  return (
    <>
     <UpperUserNavComponent />

      <button onClick={goBack}>
        <img src={arrowBack} alt="Back" className="px-1" />
      </button>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl pb-3">{planetName}</h2>
        {imgSrc && <img src={imgSrc} alt={planetName} className=" " />}
      </div>
      <div className="bg-darkGrey p-3 pb-16 my-4 rounded-tl-3xl rounded-tr-3xl max-h-screen tracking-wide">
        <h3 className="text-2xl text-center p-3">@User.Signo</h3>
        <p className="p-2">El sol revela la cualidad básica de nuestra consciencia, es el factor central de nuestra personalidad, del mismo modo como el Sol es el centro de nuestra galaxia.
        </p>
        <br />
        <p className="p-2">El elemento solar para este signo muestra el estado de conciencia y aquello que le motiva, fortalece y lo que le apasiona. El Sol en Géminis destaca su mente rápida, razonamientos lógicos y su interés por la comunicación. Para ellos la relación con otras personas es esencial, domina la oratoria, mantener una conversación interesante y viva.</p>
      </div>
      <LowerUserNav/>
    </>
  );
}
