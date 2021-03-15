import React from 'react';

import classes from './Messages.module.css';
import Message from './Message';
import Button from './Button';

const Messages = ({ messages }) => {
  console.log('Messages: ' + messages);
  return (
    <div className={classes.MessagesSection}>
      {messages.map((message, index) => {
        return (
          <div className={classes.MessagesContainer}>
            <Message message={message} index={index} />
            <Button value={message} index={index} />
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
