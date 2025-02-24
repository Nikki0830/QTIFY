import React from 'react';
import { Chip } from '@mui/material';
import './Card.css'; // For styling the Card component

const Card = ({ item, isSongsSection }) => {
  // Destructure with default values to prevent errors
  const { image = '', title = '', followCount = 0, likes = 0 } = item || {};

  // Only render the Card if item is valid
  if (!item) {
    return null; // Or render a fallback UI, e.g., <div>Loading...</div>
  }

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-body">
        <h3>{title}</h3>
        <Chip
          label={isSongsSection ? `${likes} Likes` : `${followCount} Follows`}
          className="follow-chip"
        />
      </div>
    </div>
  );
};

export default Card;


