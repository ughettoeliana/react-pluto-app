import React from "react";
import UpperNav from "../components/UpperUserNav";
import LowerUserNav from "../components/LowerUserNav";
import arrow from "../assets/arrow-right.svg";
import grafica from "../assets/grafica.svg";

export default function Cicles() {
  
  return (
    <div>
      <UpperNav />
      <div className="p-3">
        <h2 className=" text-3xl">Ciclos</h2>
        <p>Ciclos astrológicos importantes que impactan en tu vida.</p>
      </div>
      <div>
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
