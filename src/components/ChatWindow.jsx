import "../styles/chat-window.css";

import Chat from "./Chat";

export default function ChatWindow() {
  // function addMessage(message, user) {
  //   setMessage("");
  //   setUser("me");
  // }

  return (
    <>
      <div className="chat-frame">
        <Chat user="me" message="Hello, how are you?" />
        <Chat user="bot" message="Hi, I'm fine, thanks!" />
      </div>
      <div className="write-bar">
        <input placeholder="Write a message..." className="write-bar-input" />
        <button className="write-bar-button"> {">"} </button>
      </div>
    </>
  );
}
