import React from "react";

const Message = ({ message, index }) => {
  const displayMessage = ({ response }) => {
    const [textMessage] = response.filter((messageInfo) => messageInfo.message === 'text');
    return textMessage.text.text[0];
  };

  return (
    <div className="messageCard" key={`key-${index}`}>
      {
        message.isBot ?
        <div className="botCard">
          <p
            style={{
              paddingLeft: "16px",
              paddingRight: "10px",
              fontFamily: "Montserrat",
              paddingTop: "10px",
              paddingBottom: "10px",
              fontWeight: 700
            }}
          >
            { displayMessage(message) }
          </p>
        </div>
        :
        <div className="userCard">
          <p
            style={{
              paddingLeft: "16px",
              paddingRight: "10px",
              fontFamily: "Montserrat",
              fontWeight: 700
            }}
          >
            {message.text}
          </p>
        </div>
      }
    </div>
  );
};

export default Message;
