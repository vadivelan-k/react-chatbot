import React from 'react';
import { Button } from 'react-bootstrap';
import classes from './CalendarConfirmButton.module.css';

const CalendarConfirmButton = ({ actionText, handleSendRequest }) => {
  return (
    <Button
      className={classes.confirmBtn}
      variant='primary'
      onClick={() => {
        handleSendRequest({ actionText: actionText });
      }}
    >
      Confirm
    </Button>
  );
};

export default CalendarConfirmButton;
