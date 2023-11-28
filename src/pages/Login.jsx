import React, { useState } from "react";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import BtnLoader from "../components/BtnLoader";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../components/NavBar";

import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setLoginLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {

        if (!userCredentials) {
          setErrorMessage("El correo electrónico no es válido");
        } else {
          const userId = userCredentials.user.uid;

          navigate(`/user-home/${userId}`);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "Correo electrónico ya está en uso. Por favor, utiliza otro."
          );
        } else if (error.code === "auth/invalid-login-credentials") {
          setErrorMessage("No existe una cuenta con ese email.");
        } else {
          setErrorMessage(
            "Error en el registro. Por favor, inténtalo de nuevo."
          );
        }
      })
      .finally(() => {
        setLoginLoader(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex justify-center items-center w-full flex-wrap  py-8 md:flex-nowrap">
          <form onSubmit={login} className="wy-9  w-1/2">
            <h1 className="text-center text-3xl py-3 mb-5">Inicio de Sesión</h1>
            <div className="flex flex-col">
              <div className="flex flex-col mb-6">
                <label className="p-1" htmlFor="email">
                  Email
                </label>
                <BaseInput
                  id="email"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mb-6">
                <label className="p-1" htmlFor="password">
                  Contraseña
                </label>
                <BaseInput
                  id="password"
                  required
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
              <div className="p-1">
                ¿No tenés una cuenta?
                <br />
                <Link
                  to="/register"
                  className="text-blue hover:cursor-pointer text-lg"
                >
                  Registrate
                </Link>
              </div>
            </div>
            {loginLoader ? (
              <div className=" opacity-80 flex flex-col">
                <BtnLoader className="my-4" />
              </div>
            ) : (
              <div className="flex flex-col">
                <BaseButton
                  btnText={"Ingresar"}
                  className="my-4"
                  onClick={login}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
