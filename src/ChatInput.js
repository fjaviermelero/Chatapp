import * as React from "react";
import "./MessageList.css"; // importar el archivo CSS
import { useState } from "react";

export default function ChatInput(props) {
  class Message {
    constructor(messageContent, userName, roomName) {
      this.messageContent = messageContent;
      this.userName = userName;
      this.roomName = roomName;
    }
  }

  const [inputValue, setInputValue] = useState("");

  let socket = props.socket;

  const handleClick = (event) => {
    event.preventDefault();

    let messageContent = inputValue;
    let userName = props.userName;
    let roomName = props.roomName;

    const newMessage = new Message(messageContent, userName, roomName);
    socket.emit("newMessage", newMessage);

    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form className="message-input-container">
      <input
        type="text"
        placeholder="Write your message"
        className="message-input"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" className="send-button" onClick={handleClick}>
        Send
      </button>
    </form>
  );
}
