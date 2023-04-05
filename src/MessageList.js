import React, { useState, useEffect } from "react";
import "./MessageList.css"; // importar el archivo CSS

function MessageList(props) {
  let socket = props.socket;

  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("messagesUpdated", (updatedMessages) => {
        //When messages update is received from Backend updates the frontend array for them.
        setCurrentChatMessages(updatedMessages);
        renderMessages();

        setTimeout(() => {
          const messageList = document.querySelector(".message-list");
          messageList.scrollTop = messageList.scrollHeight;
        }, 10);
      });
    }
  });

  function renderMessages() {
    return currentChatMessages.map((message, index) => (
      <div>
        <li
          key={index + 1}
          className={
            message.userName === props.userName
              ? "message right"
              : "message left"
          }
        >
          <b> {message.userName}:</b> {message.messageContent}
        </li>
      </div>
    ));
  }

  return (
    <div className="chat-container">
      {" "}
      <ul className="message-list">{renderMessages()}</ul>{" "}
    </div>
  );
}

export default MessageList;
