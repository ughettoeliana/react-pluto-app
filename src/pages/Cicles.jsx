import React from "react";
import UpperNav from "../components/UpperUserNav";
import LowerUserNav from "../components/LowerUserNav";
import arrow from "../assets/arrow-right.svg";
import grafica from "../assets/grafica.svg";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "../assets/btn-back.svg";

export default function Cicles() {
  const {id} = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(`/user-home/${id}`);
  };
  return (
    <div>
      <UpperNav />
      <div className="m-2">
        <button onClick={goBack} className="self-start">
          <img src={arrowBack} alt="Back" className="px-1" />
        </button>
      </div>
      <div className="p-3">
        <h2 className=" text-3xl">Ciclos</h2>
        <p>Ciclos astrológicos importantes que impactan en tu vida.</p>
      </div>
      <div className=" pb-16">
        <div className="flex flex-row justify-between items-center bg-darkGrey rounded-xl p-3 mx-2 my-4">
          <div className="flex flex-row justify-between items-center">
            <img src={grafica} />
            <div className="px-4">
              <h3 className="text-xl">Mercurio Retrogrado</h3>
              <h4>Duración del Ciclo:</h4>
              <p>28/06/2022 al 11/02/2024</p>
            </div>
          </div>
          <img src={arrow} alt="arrow icon" />
        </div>
        <div className="flex flex-row justify-between items-center bg-darkGrey rounded-xl p-3 mx-2 my-4">
          <div className="flex flex-row justify-between items-center">
            <img src={grafica} />
            <div className="px-4">
              <h3 className="text-xl">Mercurio Retrogrado</h3>
              <h4>Duración del Ciclo:</h4>
              <p>28/06/2022 al 11/02/2024</p>
            </div>
          </div>
          <img src={arrow} alt="arrow icon" />
        </div>
      </div>
      <LowerUserNav />
    </div>
  );
}
