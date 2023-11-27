import { DocumentReference, addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

const chatRefCache = {};

/**
 * 
 * @param {{senderId: string, receiverId: string, message: string}} data
 * @returns {Promise}
 */
export async function sendChatMessage({ senderId, receiverId, message }) {
    const chatDoc = await getChatDoc({ senderId, receiverId });
    const messagesRef = collection(db, `chats/${chatDoc.id}/messages`);

    await addDoc(messagesRef, {
        senderId,
        message,
        created_at: serverTimestamp(),
    });
    return true;
}

/**
 * 
 * @param {{senderId: string, receiverId: string}} users
 * @param {({}[]}) => void} callback 
 * @returns {Promise<import("firebase/auth").Unsubscribe>}
 */
export async function subscribeToChat({ senderId, receiverId }, callback) {
    const chatDoc = await getChatDoc({ senderId, receiverId });

    const messagesRef = collection(db, `chats/${chatDoc.id}/messages`);

    const q = query(
        messagesRef,
        orderBy('created_at')
    );

    return onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                senderId: doc.data().senderId,
                message: doc.data().message,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(messages);
    });
}

/**
 * 
 * @param {{senderId: string, receiverId: string}} users
 * @returns {Promise<DocumentReference>}
 */
async function getChatDoc({ senderId, receiverId }) {
    const cachedRef = getFromCache({ senderId, receiverId });
    if (cachedRef) {
        return cachedRef;
    }

    const chatRef = collection(db, 'chats');

    // Buscamos a ver si el documento existe.
    const q = query(
        chatRef,
        where('users', '==', {
            [senderId]: true,
            [receiverId]: true,
        }),
        limit(1),
    );

    const snapshot = await getDocs(q);
    let chatDoc;

    if (snapshot.empty) {
        // Creamos el documento para el chat privado.
        chatDoc = await addDoc(chatRef, {
            users: {
                [senderId]: true,
                [receiverId]: true,
            }
        });
    } else {
        chatDoc = snapshot.docs[0];
    }

    addToCache({ senderId, receiverId }, chatDoc);

    return chatDoc;
}

function addToCache({ senderId, receiverId }, value) {
    chatRefCache[getKeyForCache({ senderId, receiverId })] = value;
}

function getFromCache({ senderId, receiverId }) {
    return chatRefCache[getKeyForCache({ senderId, receiverId })] || null;
}

function getKeyForCache({ senderId, receiverId }) {
    return senderId + receiverId;
}