import React from "react";
import "./NavBar.css"
import logoImg from './../../assets/logoImg.png';


function NavBar() {
  return (
    <nav className="navbarContainer">
      <img 
        src={logoImg} 
        alt="logo" 
        className="logo"
      />
      
      <input 
        type="text"
        className="search-input"
        placeholder="Search a song"
      />

      <button className="feedback-button">
        Give Feedback
      </button>
    </nav>
  );
}

export default NavBar;
