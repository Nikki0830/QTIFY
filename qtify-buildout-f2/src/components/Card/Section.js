import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Card from './Card';
import Carousel from '../Carousel/Carousel';
import './Section.css';

const Section = ({ title, apiEndpoint, children }) => {
  const [items, setItems] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    Axios.get(apiEndpoint)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Unexpected API response:", response.data);
          setItems([]); // Ensure it's always an array
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setItems([]); // Prevent undefined errors
      });
  }, [apiEndpoint]);

  return (
    <div className="section">
      <div className="section-header">
        <h2>{title}</h2>
        <button 
          className="show-all-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 'Collapse' : 'Show All'}
        </button>
      </div>

      {collapsed ? (
        <Carousel items={items} />
      ) : (
        <div className="grid">
          {items.length > 0 ? (
            items.map((item) => <Card key={item.id} album={item} />)
          ) : (
            <p className="no-data">No data available</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default Section;



