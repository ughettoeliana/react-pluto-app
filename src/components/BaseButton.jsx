import React from "react";

export default function BaseButton ({ btnText, className = "", icon, onClick })  {
  const defaultClasses =
    " bg-blue text-white self-center py-2 px-3 rounded-xl hover:cursor-pointer";

  return (
    <button  onClick={onClick}  className={`${defaultClasses} ${className}`}>{icon} {btnText}</button>
  );
};
