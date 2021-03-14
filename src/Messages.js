import React from "react";
import "./style.css";
import Message from "./Message";

const Messages = ({ messages }) => {
  console.log("Messages: " + messages);
  return (
    <div className="messagesSection">
      {messages.map((message, index) => {
        return (
          <div className="messagesContainer">
            <Message message={message} index={index} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;