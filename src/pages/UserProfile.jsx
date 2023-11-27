import React, { useEffect, useState } from "react";
import arrowBack from "../assets/btn-back.svg";
import arrow from "../assets/arrow-right.svg";
import profilePic from "../assets/avatar-anisha.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import LowerUserNav from "../components/LowerUserNav";

function UserProfile() {
  const [email, setEmail] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = doc(db, "users", id);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const userEmail = userData.email;
          setEmail(userEmail);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex items-center justify-between h-full p-3">
        <div>
          <Link onClick={goBack} className="self-start">
            <img src={arrowBack} alt="Back" className="px-1" />
          </Link>
        </div>
        <div className="mx-1">
          <Link className="bg-darkGrey rounded-lg p-2 mx-1">Editar Perfil</Link>
        </div>
      </div>
      <div>
        <div className=" p-2 mt-4">
          <div className=" ">
            <img src={profilePic} alt="foto del usuario" className="h-20" />
            <h2 className="text-md mx-1 my-4">{email}</h2>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #ffff', padding: '3rem 0' }}>
        <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-4 mx-2 mb-4">
          <Link to="/cicles">HOY </Link>
          <img src={arrow} alt="arrow icon" />
        </div>
        <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-4 mx-2 mb-4">
          <Link to="/cicles">TUS CICLOS </Link>
          <img src={arrow} alt="arrow icon" />
        </div>
        <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-4 mx-2 mb-4">
          <Link to="/cicles">TU CARTA ASTRAL </Link>
          <img src={arrow} alt="arrow icon" />
        </div>
        <div className="flex flex-row justify-between items-center text-2xl bg-darkGrey rounded-xl p-4 mx-2 mb-4">
          <Link to="/cicles">CONSULTAR A LOS ASTROS </Link>
          <img src={arrow} alt="arrow icon" />
        </div>
      </div>
      <LowerUserNav/>
    </div>
  );
}

export default UserProfile;
