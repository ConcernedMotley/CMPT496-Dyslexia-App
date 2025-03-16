// src/components/PlayPage.jsx
//page with the levels to pick
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/play_style.css';

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'

import playRac from '../assets/play-rac.svg'

function PlayPage() {
  return (
    <><NavBar />
    <div className="play-container">
      <h1 className='play-text purple-text'>Play Page</h1>
      <p className='play-desc'>Select a level difficulty below</p>
      <img className='play-rac' src={playRac} alt="mascot raccoon" />

      {/*TODO want to lock the levels and have greyed out unclickable */}
      <div className='level-select-container'>
        <Link to="/LevelLibrary/1">
          <button className="level-select-button purple-button">Level 1</button>
        </Link>
        <Link to="/LevelLibrary/2">
          <button className="level-select-button purple-button">Level 2</button>
        </Link>
        <Link to="/LevelLibrary/3">
          <button className="level-select-button purple-button">Level 3</button>
        </Link>
        <Link to="/LevelLibrary/4">
          <button className="level-select-button purple-button">Level 4</button>
        </Link>
      </div>

      {/*<Link to="/LandingPage">
        <button className="play-button purple-button">Back to Landing Page!</button>
      </Link>*/}

    </div>
    <BottomSprinkles className="landing-sprinkles" />
    </>
  );
}

export default PlayPage;