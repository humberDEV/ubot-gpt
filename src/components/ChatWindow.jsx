import "../styles/chat-window.css";
import { useState } from "react";
import Chat from "./Chat";

export default function ChatWindow() {
  const [messageArray] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  function addMessageUser() {
    if (newMessage.trim()) {
      messageArray.push({ message: newMessage, user: "me" });
      setNewMessage("");
    }
    addMessageBot();
  }

  function addMessageBot() {
    messageArray.push({ message: "Victor si es un mamaguevo", user: "bot" });
    setNewMessage("");
  }

  return (
    <>
      <div className="chat-frame">
        {messageArray.map((message, index) => (
          <Chat key={index} user={message.user} message={message.message} />
        ))}
      </div>
      <div className="write-bar">
        <div className="input-container">
          <input
            placeholder="Write a message..."
            className="write-bar-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="write-bar-button" onClick={addMessageUser}>
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
