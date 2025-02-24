import React from "react";

import Hero from "./components/Hero/Hero";
import NavBar from "./components/NavBar/NavBar";
import Section from "./components/Card/Section";

function App() {
  return (
    <div className="App">
     <NavBar/>
      <Hero />
      <Section/>
    </div>
  );
}

export default App;
