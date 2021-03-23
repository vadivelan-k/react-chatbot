import React from 'react';
import Rating from 'react-rating';

const RatingComponent = ({ handleSendRequest }) => {
  const handleRating = (value) => {
    console.log('selected value:: ', value);

    // handleSendRequest({ actionText: value });
  };

  return (
    <div className='rating-container'>
      <Rating onChange={handleRating}/>
    </div>
  );
};

export default RatingComponent;
