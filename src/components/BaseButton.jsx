import React from "react";

export default function BaseButton ({ btnText, className = "", icon, onClick })  {
  const defaultClasses =
    "bg-blue text-white self-center py-3 px-4 rounded-xl hover:cursor-pointer";

  return (
    <button  onClick={onClick}  className={`${defaultClasses} ${className}`}>{icon} {btnText}</button>
  );
};
