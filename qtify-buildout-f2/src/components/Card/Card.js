import React from 'react';
import { Chip } from '@mui/material';
import './Card.css'; // For styling the Card component

const Card = ({ album = {} }) => {
  const { image = '', followCount = 0, title = 'Unknown Title' } = album || {};

  return (
    <div className="card">
      {image ? (
        <img src={image} alt={title} className="card-image" />
      ) : (
        <div className="placeholder-image">No Image</div>
      )}
      <div className="card-body">
        <h3>{title}</h3>
        <Chip label={`${followCount} Follows`} className="follow-chip" />
      </div>
    </div>
  );
};

export default Card;

