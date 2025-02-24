import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Section from '../Card/Section';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './SongsSection.css';

const SongsSection = () => {
  const [genres, setGenres] = useState([]);  // Initialize as empty array
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // Fetch Genres
  useEffect(() => {
    Axios.get('https://qtify-backend-labs.crio.do/genres')
      .then((response) => {
        console.log('Fetched genres:', response.data);  // Log genres to verify structure
        setGenres(response.data); // Set the genres data
      })
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  // Fetch Songs
  useEffect(() => {
    Axios.get('https://qtify-backend-labs.crio.do/songs')
      .then((response) => {
        console.log('Fetched songs:', response.data);  // Log songs to verify structure
        const songs = response.data;
        if (selectedGenre === 'All') {
          setFilteredSongs(songs);
        } else {
          const filtered = songs.filter((song) =>
            song.genre.toLowerCase() === selectedGenre.toLowerCase()
          );
          setFilteredSongs(filtered);
        }
      })
      .catch((error) => console.error('Error fetching songs:', error));
  }, [selectedGenre]);

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setSelectedGenre(newValue);
  };

  return (
    <div className="songs-section">
      <Tabs
        value={selectedGenre}
        onChange={handleTabChange}
        className="genre-tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="All" value="All" />
        {Array.isArray(genres) && genres.length > 0 ? (
          genres.map((genre) => (
            <Tab key={genre.id} label={genre.name} value={genre.name} />
          ))
        ) : (
          <p>Loading genres...</p>  // Loading state while genres are fetched
        )}
      </Tabs>

      <Section
        title="Songs"
        songs={filteredSongs}  // Pass filtered songs
        isSongsSection={true}
      />
    </div>
  );
};

export default SongsSection;

