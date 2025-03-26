import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav_style.css';  // Import the CSS file

import LumoLearn from '../assets/LumoLearn.svg';
import logo from '../assets/nav-logo.svg';
import cog from '../assets/cog.svg';

function NavBar() {
    return (
      <div className="nav-container">
        <img className="LumoLearn" src={LumoLearn} alt="LumoLearn Logo" />
        <img className="cog" src={cog} alt="Settings" />
        <img className="logo" src={logo} alt="LumoLearn Logo" />
      </div>
    );
  }
  
export default NavBar;