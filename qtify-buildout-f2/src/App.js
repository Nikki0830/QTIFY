import React from "react";

import Hero from "./components/Hero/Hero";
import NavBar from "./components/Navbar/NavBar";
import Section from "./components/Card/Section";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Hero />
      <Section
        title="Top Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
      />
    </div>
  );
}

export default App;
