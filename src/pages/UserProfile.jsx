import React, { useEffect, useState } from "react";
import arrowBack from "../assets/btn-back.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const getUserData = async (userId, setEmail) => {
  try {
    const userRef = doc(db, "users", userId);
    console.log("userRef", userRef);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const userEmail = userData.email;
      setEmail(userEmail);
    }
    console.log("email", email);

  } catch (error) {
    console.log(error);
  }
};

function UserProfile() {
  const [email, setEmail] = useState();
  const userId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData(userId, setEmail);
  }, [userId]);

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
        <h2>{email}</h2>
      </div>
    </div>
  );
}

export default UserProfile;
