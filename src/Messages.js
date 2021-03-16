import React, { useState } from 'react';

import classes from './Messages.module.css';
import Message from './Message';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Messages = ({ messages }) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  console.log('Messages: ' + messages);
  return (
    <div className={classes.MessagesSection}>
      <Modal open={open} onClose={onCloseModal} center>
        <p>You have successfully login with SingPass.</p>
      </Modal>
      {messages.map((message, index) => {
        return (
          <div className={classes.MessagesContainer}>
            <Message message={message} index={index} />
          </div>
        );
      })}
      {/* <button onClick={onOpenModal}>Login via SingPass</button> */}
    </div>
  );
};

export default Messages;
