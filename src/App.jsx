import "./App.css";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <>
      <div className="app-header">
        <h1 className="app-title">uBot GPT</h1>
        <span className="credits">
          made with &lt;3 by{" "}
          <a href="https://github.com/humberDEV" target="_blank">
            humberDEV
          </a>
        </span>
      </div>
      <ChatWindow className="chat-window" />
    </>
  );
}

export default App;
