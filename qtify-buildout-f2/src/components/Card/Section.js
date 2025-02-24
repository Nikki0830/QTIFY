import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import './Section.css'; // For styling the Section component

const Section = ({ title }) => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Fetching album data from the API
    Axios.get('https://qtify-backend-labs.crio.do/albums/top')
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
      {!collapsed && (
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
