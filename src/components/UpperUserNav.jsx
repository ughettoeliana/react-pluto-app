import React, { useEffect, useState } from "react";
import profilePic from "../assets/avatar-anisha.png";
import notification from "../assets/notification-icon.svg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useParams } from "react-router-dom";
import GeneralLoader from "../components/GeneralLoader";

export default function UpperNav() {
  const [email, setEmail] = useState();
  const { id } = useParams();

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
  return (
    <nav className="flex flex-row justify-between items-center p-3 mb-3">
      <div className="flex flex-row items-center ">
        <img src={profilePic} alt="foto del usuario" className="h-12" />
        {email ? <p className="px-2 mx-2">Hola {email}</p> : <GeneralLoader className='p-4'/>}
      </div>
      <div>
        <img src={notification} />
      </div>
    </nav>
  );
}
