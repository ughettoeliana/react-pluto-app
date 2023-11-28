import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../services/firebase";
import BaseButton from "../BaseButton";
import { useNavigate } from "react-router-dom"; 

function AuthDetails() {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user.email : null);
    });

    return () => {
      unsubscribe(); // Detiene la escucha al desmontar el componente
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error al cerrar sesión", error);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {authUser ? (
        <BaseButton
          btnText="Cerrar Sesión"
          onClick={userSignOut}
          className="bg-slate-500"
        />
      ) : (
        <BaseButton
          btnText="Iniciar Sesión"
          onClick={handleLogin}
          className="bg-indigo-500"
        />
      )}
    </div>
  );
}

export default AuthDetails;
