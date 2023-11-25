import React, { useState } from "react";
import BaseInput from "../components/BaseInput";
import BaseButton from "../components/BaseButton";
import BtnLoader from "../components/BtnLoader";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../components/NavBar";
import { auth } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerLoader, setRegisterLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newUserId, setNewUserId] = useState(null);

  const navigate = useNavigate();

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
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredentials.user;

        await addUserToFirestore(user);
        console.log("Cuenta creada con éxito");
      }
    } catch (error) {
      console.error("Error en el registro:", error.code, error.message);
    } finally {
      setRegisterLoader(false);
    }
  };

  const addUserToFirestore = async (user) => {
    if (user) {
      const usersCollectionRef = collection(db, "users");
      const newUser = await addDoc(usersCollectionRef, {
        id: user.uid,
        email: user.email,
      });
      console.log('newUser.id', newUser.id)
      setNewUserId(newUser.id)
      navigate(`/get-sign/${newUser.id}`);
      console.log("newUserId:",newUserId)
    }
    console.log("El usuario se agrego a firebase");
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="flex justify-center items-center w-full flex-wrap  py-8 md:flex-nowrap">
          <form className="wy-9  w-1/2">
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
                <Link
                  to="/login"
                  className="text-blue hover:cursor-pointer text-lg px-2"
                >
                  Inicia Sesión
                </Link>
              </h3>
            </div>

            {registerLoader ? (
              <BtnLoader />
            ) : (
              <div className="flex flex-col">
                <BaseButton
                  btnText="Continuar"
                  className="my-4"
                  onClick={register}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
