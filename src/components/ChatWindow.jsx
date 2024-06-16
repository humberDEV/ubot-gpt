import "../styles/chat-window.css";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import { CreateWebWorkerMLCEngine } from "https://esm.run/@mlc-ai/web-llm";

export default function ChatWindow() {
  const SELECTED_MODEL = "phi-2-q4f16_1-MLC-1k";

  const [disabled, setDisabled] = useState(false);
  const [engine, setEngine] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function initializeEngine() {
      const engine = await CreateWebWorkerMLCEngine(
        new Worker(new URL("./worker.js", import.meta.url), { type: "module" }),
        SELECTED_MODEL,
        {
          initProgressCallback: (info) => {
            document.getElementById("loading-text").textContent = info.text;
          },
        }
      );
      setEngine(engine);
    }
    initializeEngine();
  }, []);

  async function addMessageUser() {
    if (newMessage.trim()) {
      // Añadir el mensaje del usuario
      const updatedMessages = [
        ...messageArray,
        { role: "user", content: newMessage, user: "me" },
      ];
      setMessageArray(updatedMessages);
      setNewMessage("");
      setDisabled(true);

      try {
        const reply = await engine.chat.completions.create({
          messages: updatedMessages,
        });

        addMessageBot(reply.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching response:", error);
        setDisabled(false);
      }
    }
  }

  function addMessageBot(message) {
    setMessageArray((prev) => [
      ...prev,
      { role: "user", content: message, user: "bot" },
    ]);
    setDisabled(false);
  }

  return (
    <>
      <div className="chat-frame">
        {messageArray.map((message, index) => (
          <Chat key={index} user={message.user} message={message.content} />
        ))}
      </div>
      <div className="write-bar">
        <div className="input-container">
          <input
            placeholder="Write a message..."
            className="write-bar-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={disabled}
          />
          <button
            className="write-bar-button"
            onClick={addMessageUser}
            disabled={disabled}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className="loading-container">
        <div className="loading-text">
          <p id="loading-text">Loading...</p>
        </div>
      </div>
    </>
  );
}
