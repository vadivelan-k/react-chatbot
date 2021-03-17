import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButton = ({ actionText, handleSendRequest }) => {
  return (
    <Button variant="primary" onClick={() => {
      handleSendRequest({actionText: actionText})
    }}>
      { actionText }
    </Button>
  );
};

export default ActionButton;
