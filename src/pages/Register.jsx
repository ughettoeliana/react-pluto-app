import React, { useState } from "react";
import BaseButton from "../components/BaseButton";
import BaseInput from "../components/BaseInput";
import { register } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import BtnLoader from "../components/BtnLoader";
import ErrorMessage from "../components/ErrorMessage";

function Register() {
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    setRegisterLoading(true);

    try {
      const userResult = await register({ ...newUser });

      if (userResult.code) {
        if (userResult.code === "auth/email-already-in-use") {
          setErrorMessage(
            "El email ya esta en uso, inténtalo de nuevo con otro email"
          );
        }
      }
      setNewUser({
        ...newUser,
        id: userResult.uid,
        email: userResult.email,
      });
      navigate(`/get-sign/${userResult.id}`);
    } catch (error) {
      setErrorMessage("Algo salió mal, inténtalo de nuevo");
      console.error(error);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <div className="flex justify-center items-center w-full flex-wrap  py-8 md:flex-nowrap">
          <form onSubmit={handleRegister} className="wy-9  w-1/2">
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
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  disabled={registerLoading}
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
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  disabled={registerLoading}
                />
              </div>
              {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
              <div>
                ¿Ya tenés una cuenta?
                <br />
                <Link
                  to="/login"
                  className="text-blue hover:cursor-pointer text-lg"
                >
                  Inicia Sesión
                </Link>
              </div>
            </div>

            {registerLoading ? (
              <BtnLoader className="my-4 flex flex-col" />
            ) : (
              <div className="flex flex-col">
                <BaseButton
                  btnText="Continuar"
                  className="my-4"
                  onClick={handleRegister}
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
