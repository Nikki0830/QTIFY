import React from "react";
import NavBar from "./components/Navbar/NavBar";
import Hero from "./components/Hero/Hero";
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
      <Section
        title="New Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
      />
    
    </div>
  );
}

export default App;

