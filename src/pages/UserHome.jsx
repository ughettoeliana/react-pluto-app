import React, { useEffect, useState } from "react";
import carta from "../assets/carta.png";
import mars from "../assets/planets/mars.png";
import mercury from "../assets/planets/mercury.png";
import moon from "../assets/planets/moon.png";
import sun from "../assets/planets/sun.png";
import arrow from "../assets/arrow-right.svg";
import { Link, useParams } from "react-router-dom";
import LowerUserNavComponent from "../components/LowerUserNav";
import UpperUserNavComponent from "../components/UpperUserNav";

const spanishPlanetNames = {
  Sun: "Sol",
  Mars: "Marte",
  Mercury: "Mercurio",
  Moon: "Luna",
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

function UserHome() {
  const { id } = useParams();

  const planets = [
    { name: "Sun", imgSrc: sun },
    { name: "Mars", imgSrc: mars },
    { name: "Mercury", imgSrc: mercury },
    { name: "Moon", imgSrc: moon },
  ];

  return (
    <>
      <UpperUserNavComponent />
      <div className="flex flex-col justify-center px-3">
        <h2 className="my-2">PLUTO es tu guía personal hacia el futuro</h2>
        <div className="self-center my-9 max-w-xs">
          <img
            src={carta}
            alt="Representacion grafica (Carta Natal) de la posisiones de los signos"
          />
        </div>
        <div className="flex flex-row justify-around items-center py-3 my-4">
          {planets.map((planet) => (
            <Link
              key={planet.name}
              to={`/planet-info/${planet.name.toLowerCase()}/${id}`}
            >
              <img src={planet.imgSrc} alt={planet.name} />
              <h3 className="text-center">
                {capitalizeFirstLetter(
                  spanishPlanetNames[planet.name] ?? planet.name
                )}
              </h3>
            </Link>
          ))}
        </div>
        <div className="my-4 mb-16">
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to={`/cicles/${id}`}>CICLOS</Link>
            <img src={arrow} alt="arrow icon" />
          </div>
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to="/user-horoscope">HOY</Link>
            <img src={arrow} alt="arrow icon" />
          </div>
          <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-3 mx-2 my-4">
            <Link to={`/user-more/${id}`}>MAS SOBRE MI</Link>
            <img src={arrow} alt="arrow icon" />
          </div>
        </div>
      </div>
      <LowerUserNavComponent />
    </>
  );
}

export default UserHome;
