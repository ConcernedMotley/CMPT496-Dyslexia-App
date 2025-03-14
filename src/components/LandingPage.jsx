// src/components/LandingPage.jsx
/*The welcome screen AFTER user has logged in */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import '../styles/general_style.css';
import '../styles/landing_style.css';

import BottomSprinkles from '../components/BottomSprinkles';
import NavBar from '../components/NavBar'

import mascRac from '../assets/landing-masc.svg';
import mascBack from '../assets/landing-back.svg';

function LandingPage() {
  const streakTotal = 4; /*TODO this is hard coded now but in the future pulling from user DB would be nice! */
  return (
    <>
    <NavBar  />
    <div className="landing-container">
        <h1 className='welcome purple-text'>Welcome Back!</h1>
        <div className='middle-container'>
          {/*masc image*/}
          <img className='masc-rac masc-back' src={mascBack} alt="mascot raccoon background" />
          <img className='masc-rac' src={mascRac} alt="mascot raccoon" />
          {/*flame img behind TODO does this change with streak?*/}
          {/*streak counter TODO would have to pull from user DB*/}
          <p className='streak-counter'>{streakTotal} Days</p>{/* */}
          <h2 className='streak-text purple-text'>Streak</h2>
          {/*week streak display*/}
          <div className="week-streak">
            <div className="day-circle">M</div>
            <div className="day-circle">T</div>
            <div className="day-circle">W</div>
            <div className="day-circle">T</div>
            <div className="day-circle">F</div>
            <div className="day-circle">S</div>
            <div className="day-circle">S</div>
          </div>
          <p className='streak-desc'>Practice each day so your streak won't reset</p>
          {/*button to the play page*/}
          <Link to="/PlayPage">
            <button className="play-button purple-button">Hop into a game</button>
          </Link>
        </div>
        </div>

        {/*<Link to="/WordCollection">
      <button className="landing-button">View Word Collection</button>
</Link>*/}
            <BottomSprinkles className="landing-sprinkles" />
    </>

  );
}

export default LandingPage;