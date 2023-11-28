import React from "react";
import arrowBack from "../assets/btn-back.svg";
import LowerUserNav from "../components/LowerUserNav";
import { useNavigate } from "react-router-dom";
import bgStars from "../assets/stars-background.jpg";
import stepsIcon from "../assets/steps-indicator.svg";

function Horoscope() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgStars})` }}
    >
      <div className="m-2">
        <button onClick={goBack} className="self-start">
          <img src={arrowBack} alt="Back" className="px-1" />
        </button>
      </div>

      <div className="bg-darkGrey bg-opacity-50 rounded-t-2xl mx-2 fixed bottom-14">
        <div className="m-2 flex justify-center">
          <img src={stepsIcon} alt="Un ícono que indica los pasos" className="p-2" />
        </div>
        <div className="flex flex-col justify-center items-center mx-4 p-4">
          <div className="p-7 m-8 text-center">
            <h1>✨ <span className="text-2xl">TUS VIBRAS PARA HOY</span> ✨</h1>
            <p className="text-slate-200 text-sm">28 de noviembre 2023</p>
          </div>
          <div className="p-4 mt-3 mb-10 tracking-wide">
            <p>
              Hoy, o cualquier día en el que las cosas te parezcan confusas o no
              vayan como esperabas, intenta dar un paso atrás y liberar algunas
              de tus expectativas. Esta energía puede estar aquí para ayudarle a
              mirar hacia adentro y depender menos de la validación externa.
              También tené en cuenta que la imprevisibilidad puede traer consigo
              algunos cambios interesantes.
            </p>
          </div>
        </div>
      </div>

      <LowerUserNav />
    </div>
  );
}

export default Horoscope;
