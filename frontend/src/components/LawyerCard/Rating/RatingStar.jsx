// src/components/RatingStar.js

import React from 'react';

const RatingStar = ({ rating, totalStars }) => {
  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= rating;

    return (
      <svg
        key={index}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFilled ? 'gold' : 'none'}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
      </svg>
    );
  });

  return <div className="flex">{stars}</div>;
};

export default RatingStar;
