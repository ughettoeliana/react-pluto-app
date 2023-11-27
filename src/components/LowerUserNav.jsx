import React from "react";
import chat from "../assets/chat-icon.svg";
import profile from "../assets/avatar-anisha.png";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function LowerUserNav() {
  const { id } = useParams();
  return (
    <div className="flex flex-row justify-around items-center p-2 fixed bottom-0 left-0 w-full  bg-black">
      <Link to={`/user-home/${id}`}>
        <FontAwesomeIcon
          icon={faHouse}
          size='xl'
          style={{ color: "#ffffff" }}
        />
      </Link>
      <Link to={`/user-chat/${id}`}>
        <img src={chat} alt="chat" className='h-8' />
      </Link>
      <Link to={`/user-profile/${id}`}>
        <img src={profile} alt="perfil del usuario" className="h-10" />
      </Link>
    </div>
  );
}
