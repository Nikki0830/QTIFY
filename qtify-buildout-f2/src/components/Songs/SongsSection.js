import React, { useState, useEffect } from "react";
import Section from "../Card/Section"; // Reusing the Section component
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import "./SongsSection.css";

function SongsSection() {
  const [genres, setGenres] = useState([]);
  const [songs, setSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [collapsed, setCollapsed] = useState(false); // To toggle the show all functionality

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://qtify-backend-labs.crio.do/genres"
        );
        if (Array.isArray(response.data)) {
          setGenres(response.data);
        } else {
          console.error("Genres data is not an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    fetchSongs("All"); // Initially fetch songs with the "All" genre
  }, []);

  // Fetch songs based on the genre
  const fetchSongs = async (genre) => {
    try {
      const response = await axios.get(
        `https://qtify-backend-labs.crio.do/songs?genre=${genre}`
      );
      setSongs(response.data);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const filterSongsByGenre = (genre) => {
    setSelectedGenre(genre);
    fetchSongs(genre); // Fetch songs when genre changes
  };

  const filteredSongs = songs.filter(
    (song) => selectedGenre === "All" || song.genre === selectedGenre
  );

  const toggleCollapse = () => {
    setCollapsed(!collapsed); // Toggle show all or collapse
  };

  return (
    <Section title="Songs" apiEndpoint="https://qtify-backend-labs.crio.do/songs">
      <Tabs
        value={selectedGenre}
        onChange={(e, value) => filterSongsByGenre(value)}
      >
        <Tab label="All" value="All" />
        {genres.map((genre) => (
          <Tab key={genre} label={genre} value={genre} />
        ))}
      </Tabs>

      <div className="section-header">
        <button className="collapse-btn" onClick={toggleCollapse}>
          {collapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      <div className="grid">
        {/* Display songs in grid */}
        {(collapsed ? filteredSongs.slice(0, 5) : filteredSongs).map((song) => (
          <div className="song-card" key={song.id}>
            <img src={song.image} alt={song.title} />
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <div className="chip">Likes: {song.likes}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default SongsSection;

