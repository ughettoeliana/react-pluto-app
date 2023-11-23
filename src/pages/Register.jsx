import React, { useState } from "react";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import Loader from "../components/LoaderComponent";
import ErrorMessage from "../components/ErrorMessageComponent";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerLoader, setRegisterLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const register = async (e) => {
    e.preventDefault();
    setRegisterLoader(true);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      console.error("Correo electrónico no válido: ", email);
      setErrorMessage("El correo electrónico no es válido");
      setRegisterLoader(false);
      return;
    }

    try {
      // Verificar si el correo electrónico ya está en uso
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods && signInMethods.length > 0) {
        console.error("Correo electrónico ya está en uso: ", email);
        setErrorMessage("Correo electrónico ya está en uso: ");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Cuenta creada con éxito");
      }
    } catch (error) {
      console.error("Error en el registro:", error.code, error.message);
    } finally {
      setRegisterLoader(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center w-full flex-wrap  py-8 md:flex-nowrap">
        <form onSubmit={register} className="wy-9  w-1/2">
          <h1 className="text-center text-3xl py-3 mb-5">Crear una cuenta</h1>
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
                onChange={handleChangeEmail}
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
            <h3>
              ¿Ya tenes una cuenta?
              <Link to="/login" className="text-blue hover:cursor-pointer text-lg px-2">
                Inicia Sesión
              </Link>
            </h3>
          </div>
          {registerLoader ? (
            <Loader className="bg-blue rounded-xl" />
          ) : (
            <div className="flex flex-col">
              <BaseButton btnText={"Ingresar"} className="my-4" type="submit" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
