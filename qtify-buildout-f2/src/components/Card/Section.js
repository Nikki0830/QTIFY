import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import './Section.css';

const Section = ({ title, apiEndpoint }) => {
  const [albums, setAlbums] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch data from API
  useEffect(() => {
    setLoading(true);
    Axios.get(apiEndpoint)
      .then((response) => {
        // Add a slight delay to ensure the request fully resolves
        setTimeout(() => {
          setAlbums(response.data);
          setLoading(false);
        }, 200);  // 200ms delay
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load data');
        setLoading(false);
      });
  }, [apiEndpoint]);

  // Toggle Collapse State
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

      {/* Loading Indicator */}
      {loading && <p className="loading-indicator">Loading...</p>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {!collapsed && !loading && !error && (
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

