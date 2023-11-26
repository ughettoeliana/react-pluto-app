import React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GeneralLoader({ className, size = "sm" }) {
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        size={size}
        style={{ color: "#babec4" }}
      />
    </div>
  );
}

export default GeneralLoader;
