// src/components/Section.js
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import Carousel from '../Carousel/Carousel';
import './Section.css';

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    Axios.get(apiEndpoint)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiEndpoint]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>
        <button className="collapse-btn" onClick={toggleCollapse}>
          {collapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>

      {collapsed ? (
        <Carousel items={albums} />
      ) : (
        <div className="grid">
          {albums.map((album) => (
            <Card key={album.id} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;


