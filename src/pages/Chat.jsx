import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BaseButton from "../components/BaseButton";
import GeneralLoader from "../components/GeneralLoader";
import { getUserProfileById } from "../services/user.js";
import { sendChatMessage, subscribeToChat } from "../services/chat.js";
import { subscribeToAuth } from "../services/auth.js";
import { dateToString } from "../helpers/date.js";
import arrowBack from "../assets/btn-back.svg";
import bgStars from "../assets/stars-background.jpg";

function Chat() {
  const { id } = useParams();
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({ id: null, email: null });
  const [authUser, setAuthUser] = useState({ id: null, email: null });
  const [newMessage, setNewMessage] = useState({ message: "" });
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [unsubscribeAuth, setUnsubscribeAuth] = useState(() => {});
  const [unsubscribeMessages, setUnsubscribeMessages] = useState(() => {});

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendChatMessage({
      senderId: authUser.id,
      receiverId: user.id,
      message: newMessage.message,
    });
    setNewMessage({ message: "" });
  };

  const formatDate = (date) => {
    return dateToString(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      setUserLoading(true);
      const userData = await getUserProfileById(id);
      setUser(userData);
      setUnsubscribeAuth(() =>
        subscribeToAuth((newUser) => setAuthUser(newUser))
      );
      setUserLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setMessagesLoading(true);
      setUnsubscribeMessages(() =>
        subscribeToChat(
          {
            senderId: authUser.id,
            receiverId: id,
          },
          (newMessages) => setMessages(newMessages)
        )
      );
      setMessagesLoading(false);
    };

    fetchData();
  }, [authUser.id, id]);

  // Almacena los mensajes en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(`chat_${authUser.id}_${user.id}`, JSON.stringify(messages));
  }, [messages, authUser.id, user.id]);

  const goBack = () => {
    navigate(`/user-home/${id}`);
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgStars})` }}
    >
      <div className="m-2">
        <button onClick={goBack} className="self-start">
          <img src={arrowBack} alt="Back" className="px-1" />
        </button>
      </div>
      <h1 className="text-2xl text-center mx-1">Chat con un Astrólogo</h1>
      <div className="flex-1 flex flex-col m-3">
        {userLoading && <GeneralLoader />}
        {!userLoading && (
          <div className="flex flex-col flex-1">
            {messagesLoading && <GeneralLoader />}
            {!messagesLoading && (
              <div className="flex flex-col p-3 flex-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-md m-1 p-3 mx-1 ${
                      message.senderId !== authUser.id
                        ? "bg-slate-400 self-start"
                        : "bg-darkGrey self-end"
                    }`}
                  >
                    <div>{message.message}</div>
                    <div className="text-slate-200 text-xs pt-1">
                      {formatDate(message.created_at) || "Enviando..."}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className="flex items-center justify-between p-3"
        >
          <div className="flex-1 px-2" style={{ width: "100%" }}>
            <input
              className="w-full bg-darkGrey p-2 rounded-xl"
              type="textarea"
              id="message"
              value={newMessage.message}
              onChange={(e) => setNewMessage({ message: e.target.value })}
            />
          </div>
          <div>
            <BaseButton btnText="Enviar" className="w-24 mr-1" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
