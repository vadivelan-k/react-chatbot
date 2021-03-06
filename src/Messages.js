import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import classes from './Messages.module.css';
import Message from './Message';

const Messages = ({ messages, handleSendRequest }) => {
  const [timestamp, setTimestamp] = useState(new Date());

  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  let timestampFormat = moment(timestamp).calendar();

  return (
    <div className={classes.MessagesSection}>
      <Alert variant="secondary">
        Ask a question about MOM
      </Alert>

      {messages.map((message, index) => {
        return (
          <div className={classes.MessagesContainer} key={index}>
            <Message
              message={message}
              index={index}
              handleSendRequest={handleSendRequest}
            />
          </div>
        );
      })}
      <div ref={divRef}></div>
    </div>
  );
};

export default Messages;
