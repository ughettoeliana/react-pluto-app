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
    <div>
     <UpperUserNavComponent />

      <button onClick={goBack}>
        <img src={arrowBack} alt="Back" className="px-1" />
      </button>

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl pb-3">{planetName}</h2>
        {imgSrc && <img src={imgSrc} alt={planetName} className=" " />}
      </div>
      <div className="bg-darkGrey p-2 my-5 rounded-tl-3xl rounded-tr-3xl max-h-screen">
        <h3 className="text-2xl text-center p-2">@User.Signo</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At dolore ea
          deleniti in? Accusantium soluta illum obcaecati in aliquam, quam fuga
          nihil mollitia earum qui recusandae corrupti eos ad aspernatur.
        </p>
      </div>
      <LowerUserNav/>
    </div>
  );
}
