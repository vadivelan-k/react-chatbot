import React from 'react';

const Button = ({ message, index }) => {
  // const displayMessage = ({ response }) => {
  //   const [textMessage] = response.filter(
  //     (messageInfo) => messageInfo.message === 'payload'
  //   );
  //   console.log(
  //     textMessage.payload.fields.buttons.listValue.values[index].stringValue
  //   );
  //   return textMessage.payload.fields.buttons.listValue.values[index]
  //     .stringValue;
  // };
  console.log(message.response);

  return <div>{/* <button>{displayMessage(message)}</button> */}</div>;
};

export default Button;
