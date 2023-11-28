import React from "react";
import BaseButton from "./BaseButton";

function BtnLoader({className}) {
  return (
    <BaseButton btnText='Cargando...' disable className={className}/>
  );
}

export default BtnLoader;
