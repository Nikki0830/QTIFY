import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Carousel from "../Carousel/Carousel";
import axios from "axios";
import Section from "../Card/Section"; // Keeping Section.js unchanged
import "./SongsSection.css";

function SongsSection() {
  const [genres, setGenres] = useState([]);  
  const [songs, setSongs] = useState([]);  
  const [filteredSongs, setFilteredSongs] = useState([]);  
  const [selectedGenre, setSelectedGenre] = useState("All"); 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/genres");
        if (response.data && Array.isArray(response.data.data)) {
          setGenres([{ key: "All", label: "All" }, ...response.data.data]); // Adding "All"
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    const fetchSongs = async () => {
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/songs");
        if (Array.isArray(response.data)) {
          setSongs(response.data);
          setFilteredSongs(response.data); // Default: show all songs
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchGenres();
    fetchSongs();
  }, []);

  const handleGenreChange = (event, newGenre) => {
    setSelectedGenre(newGenre);
    if (newGenre === "All") {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => song.genre.key === newGenre);
      setFilteredSongs(filtered);
    }
  };

  return (
    <Section title="Songs">
      {/* Genre Selection Tabs */}
      <div className="genre-filter">
        <Tabs
          value={selectedGenre}
          onChange={handleGenreChange}
          aria-label="Genres"
          TabIndicatorProps={{ style: { backgroundColor: "#FF5733" } }}
          textColor="primary"
          variant="scrollable"
        >
          {genres.map((genre) => (
            <Tab key={genre.key} label={genre.label} value={genre.key} className="genre-tab" />
          ))}
        </Tabs>
      </div>

      {/* Display Songs for Selected Genre */}
      <div className="songs-carousel">
        {filteredSongs.length > 0 ? (
          <Carousel items={filteredSongs} />
        ) : (
          <p className="no-data-message">No songs available for {selectedGenre}</p>
        )}
      </div>
    </Section>
  );
}

export default SongsSection;






