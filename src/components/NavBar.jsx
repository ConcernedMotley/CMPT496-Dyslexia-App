import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav_style.css';  // Import the CSS file
import LumoLearn from '../assets/LumoLearn.svg';
import logo from '../assets/nav-logo.svg';

function NavBar() {
    return (
      <div className="nav-container">
        <img className="LumoLearn" src={LumoLearn} alt="LumoLearn Logo" />
        <img className="logo" src={logo} alt="LumoLearn Logo" />
      </div>
    );
  }
  
export default NavBar;