import PropTypes from "prop-types";
import "../styles/chat.css";

export default function Chat({ message, user }) {
  const imageBotRoute = "src/img/neural-network.png";

  return (
    <div className="chat">
      {user === "bot" ? (
        <img src={imageBotRoute} alt="bot" className="user-pic bot" />
      ) : (
        <span className="user-pic me">You</span>
      )}
      {user === "bot" ? (
        <p className="message bot">{message}</p>
      ) : (
        <p className="message me">{message}</p>
      )}
    </div>
  );
}

Chat.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
