import React from "react";
import NavBar from "./components/Navbar/NavBar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Card/Section";
import SongsSection from "./components/Songs/SongsSection";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <Section
        title="Top Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
      />
      <Section
        title="New Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
      />
      <SongsSection />
    </div>
  );
}

export default App;

