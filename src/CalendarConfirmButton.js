import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import classes from './CalendarConfirmButton.module.css';

const CalendarConfirmButton = ({ actionText, handleSendRequest }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <Button
      className={classes.confirmBtn}
      variant='primary'
      disabled={disabled}
      onClick={() => {
        setDisabled(true);
        handleSendRequest({ actionText: actionText });
        console.log(actionText);
      }}
    >
      Confirm
    </Button>
  );
};

export default CalendarConfirmButton;
