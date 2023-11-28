import React from "react";
import UpperNav from "../components/UpperUserNav";
import LowerUserNav from "../components/LowerUserNav";
import arrow from "../assets/arrow-right.svg";
import { useNavigate, useParams } from "react-router-dom";
import arrowBack from "../assets/btn-back.svg";
import bgStars from "../assets/stars-background.jpg";

export default function UserMoreInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgStars})` }}
    >
      <UpperNav />
      <div className="m-2">
        <button onClick={goBack} className="self-start">
          <img src={arrowBack} alt="Back" className="px-1" />
        </button>
      </div>
      <div className=" pb-16">
        <div className="flex flex-row justify-between items-center bg-darkGrey rounded-xl p-3 mx-2 my-4">
          <div className="flex flex-row justify-between items-center">
            <div className="px-4">
              <div className="py-3">
                <h3 className="text-xl font-bold">Buscador Intuitivo</h3>
                <h4 className="text-sm">Crecimiento</h4>
              </div>
              <p>
                Queres ser libre y vivir una vida de aventuras - pero en ves de
                eso podrías sentirte atrapado.
              </p>
            </div>
          </div>
          <img src={arrow} alt="arrow icon" />
        </div>{" "}
        <div className="flex flex-row justify-between items-center bg-darkGrey rounded-xl p-3 mx-2 my-4">
          <div className="flex flex-row justify-between items-center">
            <div className="px-4">
              <div className="py-3">
                <h3 className="text-xl font-bold">Esperando a alguien</h3>
                <h4 className="text-sm ">Relaciones</h4>
              </div>
              <p>
                Tus relaciones mas llenadoras, donde realmente puedas ser vos misma van a tardar en llegar.
              </p>
            </div>
          </div>
          <img src={arrow} alt="arrow icon" />
        </div>
        <div className="flex flex-row justify-between items-center bg-darkGrey rounded-xl p-3 mx-2 my-4">
          <div className="flex flex-row justify-between items-center">
            <div className="px-4">
              <div className="py-3">
                <h3 className="text-xl font-bold">Impulsiva</h3>
                <h4 className="text-sm ">Instintos</h4>
              </div>
              <p>
                Tenes un lado revelde y puede ser un motivador de cambio. Para algunos sos una persona emocionante.
              </p>
            </div>
          </div>
          <img src={arrow} alt="arrow icon" />
        </div>
      </div>
      <LowerUserNav />
    </div>
  );
}
