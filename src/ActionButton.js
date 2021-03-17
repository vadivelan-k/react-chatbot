import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './ActionButton.module.css';

const ActionButton = ({ actionText, handleSendRequest }) => {
  return (
    <Button
      className={classes.Button}
      onClick={() => {
        handleSendRequest({ actionText: actionText });
      }}
    >
      {actionText}
    </Button>
  );
};

export default ActionButton;
