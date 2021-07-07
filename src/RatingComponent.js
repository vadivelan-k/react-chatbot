import React, { useState } from 'react';
import Rating from 'react-rating';

const RatingComponent = ({ handleSendRequest }) => {
  const [hidden, setHidden] = useState(true);
  const handleRating = (value) => {
    console.log('selected value:: ', value);
    handleSendRequest({ actionText: value });
  };

  return (
    <div className='rating-container'>
      <Rating
        onClick={() => {
          setHidden(false);
        }}
      />

      <br />
      <div className='feedback'>
        <span hidden={hidden}>
          Thank you for your feedback and have a nice day.
        </span>
      </div>
    </div>
  );
};

export default RatingComponent;
