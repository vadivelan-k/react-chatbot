import React, { useState, useEffect, useRef } from 'react';

import classes from './Messages.module.css';
import Message from './Message';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Messages = ({ messages, handleSendRequest }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className={classes.MessagesSection}>
      <Modal open={open} onClose={onCloseModal} center>
        <p>You have successfully login with SingPass.</p>
      </Modal>
      {messages.map((message, index) => {
        return (
          <div className={classes.MessagesContainer}>
            <Message message={message} index={index} handleSendRequest={handleSendRequest} />
          </div>
        );
      })}
      {/* <button onClick={onOpenModal}>Login via SingPass</button> */}

      <div ref={divRef}></div>
    </div>
  );
};

export default Messages;
