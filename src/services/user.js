import { doc, getDoc, getDocs, serverTimestamp, setDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string, rol: string}>}
 */
export async function getUserProfileById(id) {
  const refUser = doc(db, `users/${id}`);
  const docSnapshot = await getDoc(refUser);

  if (docSnapshot.exists()) {
    console.log("Document data:", docSnapshot.data());
    return {
      id: docSnapshot.id,
      email: docSnapshot.data().email,
      rol: docSnapshot.data().rol,
      fullName: docSnapshot.data().fullName || null,
      bio: docSnapshot.data().bio || null,
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

/**
 * 
 * @param {string} userId 
 * @param {{fullName: string, bio: string}} editedUser 
 * 
 */


export default async function updateUserPlanetsData(newUserId,validPlanetData) {
    console.log("newUserId", newUserId)
    console.log("validPlanetData", validPlanetData)
  try {
    const userRef = doc(db, "users", newUserId);
    await updateDoc(userRef, {
        planets: validPlanetData
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
}

export async function updateUserData(userId, editedUser) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      fullName: editedUser.fullName,
      bio: editedUser.bio,
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
  }
}

/**
 * 
 * @returns un listado de usuarios con sus datos
 */

export async function getUsers() {
  const usersRef = collection(db, 'users');

  try {
    const querySnapshot = await getDocs(usersRef);
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log('Estos son los usuarios:', users);
    return users;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return [];
  }
}

/**
 * 
 * @param {string} id 
 * @param {{email: string, rol: string}} data 
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
  const refUser = doc(db, `users/${id}`);
  return setDoc(refUser, { ...data, created_at: serverTimestamp() });
}