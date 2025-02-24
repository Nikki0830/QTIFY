import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Carousel from '../Carousel/Carousel';
import Card from './Card';
import './Section.css';

const Section = ({ title, apiEndpoint, isSongsSection }) => {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  // Fetch data from API
  useEffect(() => {
    Axios.get(apiEndpoint)
      .then((response) => setItems(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [apiEndpoint]);

  // Toggle Collapse State
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {!isSongsSection && (
          <button className="collapse-btn" onClick={toggleCollapse}>
            {collapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>

      {!collapsed ? (
        <Carousel items={items} isSongsSection={isSongsSection} />
      ) : (
        <div className="grid">
          {items.map((item) => (
            <Card key={item.id} item={item} isSongsSection={isSongsSection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;


