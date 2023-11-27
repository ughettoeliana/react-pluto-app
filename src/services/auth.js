import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createUserProfile } from "./user.js";
import { auth, db } from "./firebase.js";
import { ref, set } from "firebase/database";

let userData = {
  id: null,
  email: null,
  rol: null,
};

let observers = [];

//si el usuario ya estaba logeado lo mantenemos logeado
if (localStorage.getItem("user")) {
  userData = JSON.parse(localStorage.getItem("user"));
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    setUserData({
      id: user.uid,
      email: user.email,
    });
    localStorage.setItem("user", JSON.stringify(userData));
  } else {
    clearUserData();
    localStorage.removeItem("user");
  }
});

/**
 *
 * @param {{ emial: string, password: string}} user
 * @return {Promise}
 */
export async function register({ email, password }) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const rol = "user";

    //registramos el usuario en Firestore
    createUserProfile(userCredentials.user.uid, { email });
      console.log("userCredentials.user", userCredentials.user)
    return {
      id: userCredentials.user.uid,
      email: userCredentials.user.email,
      rol: "user",
    };
  } catch (error) {
    return {
      code: error.code,
      message: error.message,
    };
  }
}

//asignamos el rol de usuario al usuario

// async function asignUserRol(userId, rol) {
//   const rolesRef = ref(db, "rol/" + userId);
//   await set(rolesRef, rol);
// }

/**
 *
 * @param {{ emial: string, password: string}} user
 * @return {Promise}
 */

export function login({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      return { ...userData };
    })

    .catch((error) => {
      return {
        code: error.code,
        message: error.message,
      };
    });
}

/**
 *
 * @returns {Promise}
 */

export function logout() {
  return signOut(auth);
}

/**
 *
 * @param {({id: null|string, email: null|string}) => void} observer
 * @returns {() => void} Funcion para canselar la suscripcion del observer
 */

export function subscribeToAuth(observer) {
  observers.push(observer);
  notify(observer);

  return () => {
    observers = observers.filter((obs) => obs !== observer);
  };
}

function notifyAll() {
  observers.forEach((observer) => notify(observer));
}

/**
 *
 * @param {({id: null|string, email: null|string}) => void} observer
 */
function notify(observer) {
  observer({ ...userData });
}

function setUserData(newData) {
  userData = {
    ...userData,
    ...newData,
  };
  notifyAll();
}

function clearUserData() {
  setUserData({
    id: null,
    email: null,
    rol: null,
  });
}
