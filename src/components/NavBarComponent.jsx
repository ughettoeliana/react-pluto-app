import React from "react";
import { NavLink } from "react-router-dom";
import PlutoLogo from "../assets/logo.svg";
import AuthDetails from "./auth/AuthDetails";

const NavBar = () => {
  return (
    <nav className="flex flex-row justify-around py-5">
      <div>
        <img src={PlutoLogo} alt="el planeta pluto en 3d" className="h-10" />
      </div>
      <div className="self-center">
        <NavLink
          to="#downloadApp"
          className="text-1xl hover:cursor-pointer px-2 hover:text-indigo-500"
        >
          Descarga la App
        </NavLink>
        <NavLink
          to="/"
          className="text-1xl px-2 hover:cursor-pointer hover:text-indigo-500"
        >
          Opiniones
        </NavLink>
        <NavLink
          to="/"
          className="text-1xl px-2 hover:cursor-pointer hover:text-indigo-500"
        >
          Nosotros
        </NavLink>
      </div>
      <div>
        <AuthDetails />
      </div>
    </nav>
  );
};

export default NavBar;
