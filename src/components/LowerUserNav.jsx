import React from "react";
import menu from "../assets/home-icon.svg";
import chat from "../assets/chat-icon.svg";
import profile from "../assets/avatar-anisha.png";
import { Link, useParams } from "react-router-dom";

export default function LowerUserNav() {
  const { userId } = useParams();
  return (
    <div className="flex flex-row justify-around items-center p-2 fixed bottom-0 left-0 w-full  bg-black">
      <Link to={`/user-home/${userId}`}>
        <img src={menu} alt="menu" />
      </Link>
      <Link to={`/user-chat/${userId}`}>
        <img src={chat} alt="chat" />
      </Link>
      <Link to={`/user-profile/${userId}`}>
        <img src={profile} alt="perfil del usuario" className="h-10" />
      </Link>
    </div>
  );
}
