import React, { useState } from "react";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import LoaderComponent from "../components/LoaderComponent";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoader, setLoginLoader] = useState(false);
  const navigate = useNavigate();


  const login = (e) => {
    e.preventDefault();
    setLoginLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/get-sign");

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoginLoader(false);
      });
  };

  return (
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
            <h3>
              ¿No tenes una cuenta?
              <Link to="/register" className="text-blue hover:cursor-pointer text-lg px-2">
                Registrate
              </Link>
            </h3>
          </div>
          {loginLoader ? (
            <LoaderComponent className="bg-blue rounded-xl"/>
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
  );
}

export default Login;
